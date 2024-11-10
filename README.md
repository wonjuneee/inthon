# 애벌레 키우기
고려대학교 inThon 해커톤 7팀 

## 1. 주제 선정 이유
반복되는 일상 속에서 종종 익숙한 일상에서 벗어나 새로운 자극을 얻고 싶어 합니다. 우리 조는 이러한 "일상에서의 탈피"를 주제로 삼아, 작은 애벌레가 알에서 나와 나비가 되어 하늘을 나는 여정에 주목했습니다. 애벌레는 탈피를 거듭하며 번데기가 되고, 마침내 아름다운 나비가 되어 날아오릅니다. 이처럼 우리도 일상의 껍질을 벗어나 한층 더 성장하는 순간을 예술을 통해 경험할 수 있지 않을까요?

애벌레의 성장 과정은 삶과 예술이 만나는 상징적인 여정입니다. 애벌레가 각 단계를 거치며 껍질을 벗고 변신하듯, 예술은 우리에게 일상에서 벗어나 새로운 시각과 감성을 열어주는 경험을 제공합니다. 이번 프로젝트를 통해 우리는 일상에서 잠시 벗어나 예술을 통해 나비처럼 날아오를 작은 변화를 꿈꾸고자 합니다.

## 2. 작업 과정
### (1) 오픈 소스 데이터
KOPIS 공연예술통합전산망 https://www.kopis.or.kr/
- 서울특별시의 공연 예술 정보를 불러올 수 있도록 오픈 API를 사용하였습니다.
- 사용자가 공연 예술의 향유를 경험할 수 있게 하여 일상에서의 탈피를 도모합니다.
- 하루에 한 번씩 celery, redis를 통해 공연 정보를 불러오며 DB에 저장합니다. 이를 통해 사용자에게 현재 찾아갈 수 있는 공연 정보를 쉽고 빠르게 제공합니다.
  
### (2) Object Detection Model
patrickjohncyh/fashion-clip https://huggingface.co/patrickjohncyh/fashion-clip
- fine-tuning된 object detection model인 **fashion-clip** 모델은 80만 개의 `<image, text>` 쌍을 갖고 있어서 광범위의 detection이 가능하여 퀘스트의 질문에 알맞는 사진을 업로드했는지의 여부를 판단하기 위해 활용됩니다.
- OpenAI의 CLIP 모델을 패션 도메인에 맞게 미세 조정한 모델로 패션 제품의 이미지와 텍스트 간의 연관성을 학습한 모델입니다.
- 제로샷 학습이 가능하도록 설계되어 퀘스트 질문의 키워드와 이미지를 함께 전송했을 때 추가적인 예시나 설명 없이 유사도 점수를 매겨줄 수 있으므로 API 통신에 있어서 효율적으로 데이터 전송을 관리할 수 있다는 장점을 가졌습니다.

## 3. 프로젝트 구현
### 아키텍쳐 구조도
![inthon (2)](https://github.com/user-attachments/assets/7dc16490-bf2b-4e95-a6fa-f51a3a014def)
- NestJS: 메인 백엔드 서버
  - client인 React와 직접 API 통신을 수행합니다.
- FastAPI 서버
  - hugging face에서 fashion-CLIP 모델 inference API를 호출하여 사용자가 올린 사진이 퀘스트의 의도에 알맞는지 확인하기 위한 confidence score를 메인 서버에 반환하는 역할을 수행합니다.
- Celery + Redis
  - 24시간 주기로 공연 정보를 kopis 오픈 API로부터 가져와서 DB에 저장합니다.
- 이 모든 컨테이너를 Docker compose로 통합하여 관리합니다.

## 4. 서비스 화면
<img width="1215" alt="스크린샷 2024-11-10 오후 12 28 27" src="https://github.com/user-attachments/assets/6dd0f750-c976-4752-9c2c-7af9f463861e">
<img width="1175" alt="스크린샷 2024-11-10 오후 12 28 37" src="https://github.com/user-attachments/assets/8cbfb148-4b39-4c95-ba76-5b4193e37e45">


## 5. 팀원 소개
| 팀원명 | 학과       | 역할   | 맡은 일          |
|--------|------------|--------|------------------|
| 양은서 | 정보대학 컴퓨터학과 | 팀장, 기획   | backend, ai, architecture      |
| 원하진 | 정보대학 컴퓨터학과 | 팀원, 기획   | frontend         |
| 김수현 | 정보대학 컴퓨터학과 | 팀원, 기획   | frontend         |
| 조수빈 | 정보대학 데이터과학과 | 팀원, 기획   | backend          |
| 이원준 | 정보대학 컴퓨터학과 | 팀원, 기획   | backend, architecture          |



