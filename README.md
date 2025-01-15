# ♻️ Recycle ChatBot

<div align=center>
  
### 🛠️ Tech Stack 🛠️
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![typescript](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=Typescript&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

</div>


### 💡 서비스 개요 
###### 2024년 「미래내일 일경험사업」 우수사례 공모전 - 프로젝트 분야 본선진출한 개발물 입니다.

많은 시청과 구청에서 민원 안내 챗봇을 운영 중인 가운데, 익산시의 '폐기물 민원 안내 챗봇'은 재활용품 교환 사업 등 폐기물 정보와 지원 정책에 특화되어 주민 편의를 효과적으로 증진시키는 사례입니다. 특히, 지역마다 다른 수거 품목과 보상 기준 정보를 챗봇을 통해 간편하게 제공함으로써 주민들의 정보 접근성을 크게 개선하였습니다. 

이러한 점에 착안하여, 저희 "Recycle ChatBot"은 재활용품 관련 지원 정책에 특화된 챗봇 서비스를 개발하였습니다. 

"Recycle ChaBot"은 사용자에게 지역별 재활용 품목, 배출 방법, 보상 기준 등의 정보를 손쉽게 제공하여 자원 순환 활동 참여를 독려하고, 관련 정책에 대한 접근성을 높이는 것을 목표로 합니다. 

또한, 챗봇을 통해 재활용 관련 궁금증을 즉시 해결할 수 있도록 지원하며, 궁극적으로는 시민들의 적극적인 자원 순환 참여를 이끌어내는 데 기여하고자 합니다.

### 💻 개발기간 
2024.07.08 ~ 2024.09.13 (10주)

### ♻️ 배포 URL
[Recycle Chatbot](https://greenseoulbot.netlify.app/) (Front-end)

### 👩🏻‍💻 팀원 
|이름|github|담당|
|------|---|---|
|정다경|<https://github.com/Jeong-Dagyeong>|Front-end & UX & UI|
|김지현|<https://github.com/jyun-KIM>|Back-end & AI|
|김채린|<https://github.com/Chai-Lynn>|PM|
|유주아|-|Back-end|

### 🗂️ 디렉터리 구조 
<details>
  <summary>
      디렉터리 구조
  </summary>

  ```
📦public
 ┣ 📂fonts
 ┃ ┣ 📜KoddiUDOnGothic-Bold.ttf
 ┃ ┣ 📜KoddiUDOnGothic-ExtraBold.ttf
 ┃ ┗ 📜KoddiUDOnGothic-Regular.ttf
 ┣ 📂images
 ┃ ┣ 📜close.png
 ┃ ┣ 📜picture.png
 ┃ ┣ 📜picture_darkmode.png
 ┃ ┣ 📜recycle-icon.png
 ┃ ┣ 📜switch-on64.png
 ┃ ┗ 📜switch.png
 ┗ 📂styles
 ┃ ┣ 📜chatbot-style.css
 ┃ ┣ 📜darkmode-style.css
 ┃ ┗ 📜enlargemode-style.css

📦src
 ┣ 📂app
 ┃ ┣ 📂create
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂flows
 ┃ ┃ ┣ 📜district-flow.tsx
 ┃ ┃ ┗ 📜upload-file-flow.tsx
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┗ 📂types
 ┃ ┣ 📜FileList.tsx
 ┃ ┗ 📜Params.tsx
```

</details>

### 📑 API 명세 
|기능|method|URL|
|------|---|---|
|재활용 정책|`post`|`/chatbot/policy`|
|사진 업로드|`post`|`/chatbot/upload`|
|사용자 입력|`post`|`/chatbot/chat`|

### 📋 구현 내용

- #### 서울시 25개 구의 재활용품 지원정책 안내 기능
  1. 서울시 25개 지역구의 버튼 중 사용자가 특정 구를 선택하면 해당 구의 재활용품 지원정책을 상세히 안내
  2. 지원정책과 함께 해당 지역구의 홈페이지 url도 함께 제공하여 필요한 추가 정보에 쉽게 접근 할 수 있도록함
  3. 버튼을 이용한 방식 외에도 대화창에 특정 구 이름을 입력하거나 구 이름을 포함하여 재활용 정책을 입력하면 그에 맞는 재활용품 지원정책을 제공
 
  __차별성__

  구청 웹사이트에서 정책을 찾는 번거로움을 해소해 빠르고 직접적인 정보 제공이 가능하며, 사용자 맞춤형 정   보 접근을 도움

  ![정책정보(recycle-chatbot)](https://github.com/user-attachments/assets/ddca3d79-1133-47f0-b1cf-21bcafc2d30e)

  
- #### 이미지 첨부를 통한 대형폐기물 수수료 안내 기능
  1. 서울시 25개 지역구의 버튼 중 원하는 구를 선택 후, 폐기물 이미지를 첨부하면 AI 모델이 대형폐기물 유형을 분류하고 해당 폐기물에 부과되는 수수료 안내
  2. 폐기물 처리정보와 함께 해당 지역구의 폐기물 정보 페이지 url도 함께 제공하여 필요한 추가 정보에 쉽게 접근할 수 있도록함
 
   __차별성__

  구청 사이트에서 복잡한 단계를 거쳐 정보를 찾는 방식을 개선하여 사용자가 이미지 한 장으로 폐기물 수수료   를 빠르게 확인할 수 있도록함

  ![이미지(recycle-chatbot)](https://github.com/user-attachments/assets/33584e71-ef7b-4479-b06f-f21586fec039)

- #### 텍스트 입력을 통한 재활용품 정책 안내 기능
  1. 텍스트 입력 칸은 이미지 첨부, 구 선택할 때를 제외 하곤 모두 활성화 
  2. 기존 언어 모델에 검색 기능을 결합하여 입력된 질문과 관련된 정보를 데이터베이스에 검색한 후,  이를 기반으로 답변을 생성하는 RAG(Retrieval-Augmented Generation)기법을 도입하여 구현
 
  ![input(recycle-chatbot)](https://github.com/user-attachments/assets/b5748ba4-b2a9-4665-b2b2-9369cb28c132)



### 🎥 Recycle ChatBot 시연 영상 
[시연영상](<https://youtu.be/Rp4eszgGWuE?si=YiM3Ad_6W3CfbQ2l>)


