FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /culture_info
COPY . /culture_info

RUN pip install --upgrade pip && \
    pip install -r /culture_info/requirements.txt

CMD redis-server --daemonize yes && \
    celery -A celery_app worker --loglevel=info & \
    celery -A celery_app beat --loglevel=info
