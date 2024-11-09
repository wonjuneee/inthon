import os
import base64
import pprint
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import requests

app = FastAPI()

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/patrickjohncyh/fashion-clip"
headers = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE')}"}

class DetectionRequest(BaseModel):
    imagePath: str
    labels: str

class DetectionResponse(BaseModel):
    score: float

def detect_image(data):
    # 이미지 파일을 읽고 base64 인코딩합니다.
    response = requests.get(data["imagePath"])
    response.raise_for_status()
    img_data = response.content
    
    payload = {
        "parameters": {"candidate_labels": [data["labels"]]},
        "inputs": base64.b64encode(img_data).decode("utf-8")
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

@app.post("/detect", response_model=DetectionResponse)
async def detect(request: DetectionRequest):
    output = detect_image({
        "imagePath": request.imagePath,
        "labels": request.labels
    })
    
    return {"score": float(output[0]['score'])}
