import ChatBot from 'react-chatbotify';
import { Params } from './types/Params';
import React from 'react';
import { districtFlow } from './flows/districtFlow';
import { uploadFileFlow } from './flows/uploadFileFlow';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import './components/CheckBoxContainer.css';

function App() {
  const [form, setForm] = React.useState<{ district: string }>({
    district: '',
  });

  const settings = {
    // isOpen : 오픈형식
    isOpen: true,
    general: {
      fontFamily: 'Pretendard-Regular',
      primaryColor: '#304D30',
    },
    tooltip: {
      mode: 'CLOSE',
      text: '서울 Rechat 😊',
    },
    chatHistory: {
      disabled: true,
    },
    chatWindow: {
      showMessagePrompt: false,
    },
    header: {
      title: (
        <div className="header-container" style={{ display: 'flex' }}>
          <div style={{ color: '#163020', fontSize: '28px', fontWeight: '600' }}>Green Seoul Bot</div>
          {/* <div style={{ color: '#163020', fontSize: '28px', fontWeight: '600' }}>그린 서울 봇</div> */}
          {/* <div>
          {/* <div>
            <img src="https://img.icons8.com/?size=100&id=3725&format=png&color=304D30" style={{ width: '20px', height: '20px', marginTop: '6px', marginLeft: '5px' }} />
          </div> */}
          <div>{/* <img src="https://img.icons8.com/?size=100&id=13446&format=png&color=000000" style={{ width: '30px', height: '30px', marginTop: '6px', marginLeft: '5px' }} /> */}</div>
        </div>
      ),
      avatar: '',
      showAvatar: false,
      closeChatIcon: 'https://img.icons8.com/?size=100&id=1NVn5K29mOSz&format=png&color=000000',
    },
    botBubble: {
      showAvatar: true,
      avatar: 'https://img.icons8.com/?size=100&id=13446&format=png&color=000000',
      // avatar: 'https://img.icons8.com/?size=100&id=YHZMebEiEhFR&format=png&color=000000',
      streamSpeed: 30,
    },
    notification: {
      disabled: true,
    },
    chatInput: {
      enabledPlaceholderText: '메세지를 입력해주세요.',
    },
    fileAttachment: {
      showMediaDisplay: true,
      sendFileName: false,
    },
    footer: {
      text: (
        <div>
          <span>Team </span>
          <span style={{ fontWeight: 'bold' }}>4Cycle</span>
        </div>
      ),
    },
    emoji: {
      disabled: true,
    },
  };

  const helpOptions = ['사용방법', '재활용품 지원정책', '이미지'];
  const howToReCycle = ['재활용품 지원 정책', '물건 분리배출 방법'];

  const flow = {
    start: {
      message: '안녕하세요! 서울 Rechat 입니다. \n재활용품과 관련하여 궁금한 것이 있으시다면 무엇이든지 물어보세요!',
      options: helpOptions,
      path: 'process_options',
    },

    process_options: {
      transition: { duration: 0 },
      path: (params: Params) => {
        switch (params.userInput) {
          case '사용방법':
            return 'middle';
          case '재활용품 지원정책':
            return 'district_start';
          case '이미지':
            return 'uploadFile_start';
          default:
            return 'communicate';
        }
      },
    },

    middle: {
      message: '저는 재활용품과 관련된 여러분들의 궁금증을 해결해 드리는 Recyle Chatbot 입니다. 2. 물건 분리배출 방법 안내 블라블라라라라라라',
      options: howToReCycle,
      path: 'how_to_recycle',
    },

    how_to_recycle: {
      transition: { duration: 0 },
      path: (params: Params) => {
        switch (params.userInput) {
          case '재활용품 지원 정책':
            return 'district_start';
          case '물건 분리배출 방법':
            return 'uploadFile_start';
          default:
            return 'communicate';
        }
      },
    },

    communicate: {
      message: async (params: Params) => {
        console.log(params.userInput);
        const url = 'https://reqres.in/api/user/2';
        const data = new URLSearchParams();
        data.append('messages', params.userInput);
        const userMessage = params.userInput;
        // const inputSender = params.sender;
        try {
          const response = await axios.get(url, { data: { userMessage: userMessage } });
          console.log(response.data);

          console.log(response.data.data.name);
          return response.data.data.name;
        } catch (error) {
          console.error(error);
        }
      },
      path: 'communicate_answer',
    },

    communicate_answer: {
      transition: { duration: 0 },
      path: 'communicate',
    },

    ...districtFlow({ form, setForm }),
    ...uploadFileFlow,
  };

  return (
    <>
      <Container>
        <Box>
          <ChatBot settings={settings} flow={flow} />
        </Box>
      </Container>
    </>
  );
}

export default App;
