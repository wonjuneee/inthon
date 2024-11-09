import psycopg2
from celery_app import celery_app
import datetime
import requests
import xml.etree.ElementTree as ET
import logging
import os
from dotenv import load_dotenv

load_dotenv()

# 로깅 설정
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("etl.log")
    ]
)

@celery_app.task(name="kopis_etl_task")
def etl():
    logging.info("Starting ETL process.")
    
    service_key = os.getenv('SERVICE_KEY')
    now = datetime.datetime.now()
    stdate = (now - datetime.timedelta(days=10)).strftime('%Y%m%d')
    url = f'http://www.kopis.or.kr/openApi/restful/pblprfr?service={service_key}&stdate={stdate}&eddate=20250131&cpage=1&rows=20&prfstate=02&signgucode=11'
    
    logging.info("Sending request to API.")
    response = requests.get(url=url)
    
    logging.info("Success to get Performances Info.")
    
    # PostgreSQL에 데이터 저장
    logging.info("Connecting to PostgreSQL database.")
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )
    cur = conn.cursor()
        
    # 테이블 생성
    logging.info("Creating table if it does not exist.")
    cur.execute("""
        CREATE TABLE IF NOT EXISTS performance (
            eventId VARCHAR PRIMARY KEY,
            prfNm VARCHAR,
            prfStart DATE,
            prfEnd DATE,
            placeNm VARCHAR,
            poster VARCHAR,
            genreNm VARCHAR
        );
    """)
    conn.commit()
    
    try:
        logging.info("Parsing XML response.")
        root = ET.fromstring(response.text)
        records = []
        
        for db in root.findall('db'):
            prfpdto = db.find('prfpdto').text if db.find('prfpdto') is not None else None
            if prfpdto and datetime.datetime.strptime(prfpdto, '%Y.%m.%d') >= now:
                record = (
                    db.find('mt20id').text if db.find('mt20id') is not None else None,
                    db.find('prfnm').text if db.find('prfnm') is not None else None,
                    db.find('prfpdfrom').text if db.find('prfpdfrom') is not None else None,
                    db.find('prfpdto').text if db.find('prfpdto') is not None else None,
                    db.find('fcltynm').text if db.find('fcltynm') is not None else None,
                    db.find('poster').text if db.find('poster') is not None else None,
                    db.find('genrenm').text if db.find('genrenm') is not None else None
                )
                records.append(record)
                
        logging.info("Finished parsing XML response. Preparing to insert data.")

        # 데이터 삽입
        insert_query = """
            INSERT INTO performance (eventId, prfNm, prfStart, prfEnd, placeNm, poster, genreNm)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (eventId) DO NOTHING;
        """
        
        logging.info(f"Inserting {len(records)} records into the database.")
        cur.executemany(insert_query, records)
        conn.commit()

        # 커넥션 종료
        cur.close()
        conn.close()
        logging.info("Data successfully saved to PostgreSQL.")
        
        # 결과 출력 또는 다른 처리
        logging.info("Records successfully processed.")

    except ET.ParseError as e:
        logging.error(f"XML parsing error: {str(e)}")
        cur.execute("ROLLBACK;")
        raise
    except Exception as e:
        logging.error(f"Error in ETL process: {str(e)}")
        cur.execute("ROLLBACK;")
        raise
