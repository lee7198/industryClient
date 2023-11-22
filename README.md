[🚀 시연](https://industry-client.vercel.app)

> 개발모드에서 실행하기 `npm i` -> `npm run dev`

# 지역산업 SW인재양성 기반조성사업
주최·주관: `대구디지털혁신진흥원`, `계명대학교`, `(주)라온에이치씨`

### 지역산업 SW인재양성 기반조성사업

- 지역 SW산업 집적단지를 중심으로 한 산학관 협력 기반의 SW교육 인프라 구축 및 지역기업 맞춤형 SW인재 선순환 생태계 조성
- 사업기간: 2023.1 ~ 2023.12
- 전담기관: 정보통신산업진흥원, 대구광역시(벤처혁신과)
- 산학협력 프로젝트 지원(20개사)
- 장/단기 현장실습 프로그램 지원(25개사)
- 산학관 협력 네트워킹 연계 (지역SW기업 - 학부생 간 프로젝트 공유)

> **산학협력 프로젝트란**?
>
> - 기업이 제안한 SW개발 과제 중심, 기업(멘토) - 학생(멘티)이 현업하는 산학협력프로젝트 과정을 수행하여 현장실무 + SW개발 역량 강화 및 조기 취업 달성을 위한 프로그램
> - 학기 중에 프로젝트 팀을 구성하여 기업에서 제안한 SW개발 과제 프로젝트 공동 수행
 
### 프로젝트 배경
- YOLO v8 객체 탐지 모델을 활용하여 AI기반의 영상(객체) 처리기술을 통한 인식·분석을 개발한다.
- 사용된 데이터셋: ~~현대자동차 차량 131종과 데이터셋 10,000여장~~ -> 정확도를 위해 현대자동차 57종의 차량과 데이터셋 10,000여장 사용

### 시스템 아키텍처
<p align="center">
 <img src="https://github.com/lee7198/industryClient/assets/68184254/f43fcc21-3b4a-4fa8-9631-5e379e6d3443" width="720"/>
</p>

### 화면 구성
<p align="center">
 <img src="https://github.com/lee7198/industryClient/assets/68184254/1aee907d-cdb0-40ca-b524-f43fc3f0ad74" width="720"/>
</p>
pc 버전 (반응형)

<p align="center">
 <img src="https://github.com/lee7198/industryClient/assets/68184254/7d6572dd-5d85-4340-92a5-e7f552b19e8d" height="550"/>
</p>
모바일 버전 (반응형)

### 사용된 기술 
- 클라이언트 `React Vite`, `tailwind`, `tensorflow.js`,  `typescript`, `EsLint` ...
- 모델 `Yolo v8 (python)`, `Auto Labeling`
