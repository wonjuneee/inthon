FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /object_detection
COPY . /object_detection

RUN pip install --upgrade pip && \
    pip install --use-feature=fast-deps --use-feature=truststore -r /object_detection/requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
