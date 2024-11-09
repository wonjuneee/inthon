import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import requests

app = FastAPI()

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50"
headers = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE')}"}

class DetectionRequest(BaseModel):
    file: str

class DetectionResponse(BaseModel):
    result: str

def detect_image(url: str):
    # S3 URL에서 이미지 데이터를 가져옵니다.
    image_data = requests.get(url).content
    # Hugging Face API에 이미지 데이터를 전송합니다.
    response = requests.post(API_URL, headers=headers, data=image_data)
    return response.json()


@app.post("/detect", response_model=DetectionResponse)
async def detect(request: DetectionRequest):
    output = detect_image(request.file)
    return {"result": output[0]['label']}
