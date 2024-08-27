import ChatBot from 'react-chatbotify';
import { Params } from './types/Params';
import React from 'react';
import { uploadFileFlow } from './flows/uploadFileFlow';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import './components/CheckBoxContainer.css';
import { DistrictFlow } from './flows/DistrictFlow';

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
      actionDisabledIcon: 'none',
    },
    tooltip: {
      mode: 'CLOSE',
      text: 'Click Me!',
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
        </div>
      ),
      avatar: '',
      showAvatar: false,
      closeChatIcon: 'https://img.icons8.com/?size=100&id=1NVn5K29mOSz&format=png&color=000000',
    },
    botBubble: {
      showAvatar: true,
      avatar: 'https://img.icons8.com/?size=100&id=13446&format=png&color=000000',

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
      multiple: false,
      accept: '*',
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

  const helpOptions = ['사용방법', '재활용품 지원정책', '이미지로 대형폐기물 배출 안내'];
  const howToReCycle = ['재활용품 지원 정책', '이미지로 대형폐기물 배출 안내'];

  const flow = {
    start: {
      message: '안녕하세요! 서울 Green Seoul Bot 입니다. \n재활용품과 관련하여 궁금한 것이 있으시다면 무엇이든지 물어보세요!',
      options: helpOptions,
      path: (params: Params) => {
        switch (params.userInput) {
          case '사용방법':
            return 'middle';
          case '재활용품 지원정책':
            return 'district_start';
          case '이미지로 대형폐기물 배출 안내':
            return 'uploadFile_district';
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
          case '이미지로 대형폐기물 배출 안내':
            return 'uploadFile_district';
          default:
            return 'communicate';
        }
      },
    },

    communicate: {
      message: async (params: Params) => {
        const url = 'http://3.219.73.203:8000/chatbot/chat';
        const user_input = params.userInput;
        console.log('params.userInput', params.userInput);
        console.log('type', typeof user_input);

        try {
          const response = await axios.post(url, { user_input: user_input });
          console.log('response.data.message', response.data.message);
          return response.data.message;
        } catch (error) {
          console.log(error);
        }
      },
      options: ['처음으로'],
      path: (params: Params) => {
        switch (params.userInput) {
          case '처음으로':
            return 'start';
          default:
            return 'communicate';
        }
      },
    },

    // communicate_answer: {
    //   transition: { duration: 0 },
    //   path: 'communicate',
    // },

    ...DistrictFlow({ form, setForm }),
    ...uploadFileFlow({ form, setForm }),
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
