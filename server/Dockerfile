# 빌드 단계
FROM node:18.1.0-alpine3.14 AS builder

# 작업 디렉토리 설정
WORKDIR /server

# 의존성 파일만 먼저 복사하여 캐싱
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# NestJS 프로젝트 빌드
RUN npm run build

# 런타임 단계
FROM node:18.1.0-alpine3.14

# 작업 디렉토리 설정
WORKDIR /server

# 최적화된 실행을 위해 package.json과 package-lock.json만 복사
COPY package.json package-lock.json ./

# 필요한 프로덕션 의존성만 설치
RUN npm ci --only=production

# 빌드된 파일만 복사
COPY --from=builder /server/dist ./dist

# 환경 변수 설정 (필요시 설정)
ENV NODE_ENV=production

# NestJS 서버 실행
CMD ["node", "dist/main"]
