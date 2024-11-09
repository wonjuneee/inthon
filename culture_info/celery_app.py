from celery import Celery
from celery.schedules import crontab
import os

# Celery 앱 초기화 및 설정
celery_app = Celery('kopis_etl')
celery_app.conf.broker_url = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
celery_app.conf.result_backend = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')

# 매일 한 번씩 실행되는 스케줄 설정
celery_app.conf.beat_schedule = {
    'run_etl_daily': {
        'task': 'kopis_etl_task',
        'schedule': crontab(hour=1, minute=00),
    },
}
# 타임존 설정
celery_app.conf.timezone = 'Asia/Seoul'
celery_app.conf.enable_utc = False


from tasks import etl