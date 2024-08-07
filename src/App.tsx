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
    theme: {
      embedded: true,
      showFooter: false,
    },
    chatHistory: {
      storageKey: 'example_advanced_messages',
      disabled: true,
    },
    // botBubble: {
    //   avatar: 'ho',
    //   showAvatar: true,
    // },
    header: {
      title: (
        <h1 className="header-font" style={{ color: '#888d92', fontSize: '50px' }}>
          Recycle ChatBot
        </h1>
      ),
      showAvatar: true,
      avatar: 'https://img.icons8.com/?size=100&id=90922&format=png&color=000000',
    },
    chatWindowStyle: {
      backgroundColor: '#ffffff',
      width: '100%',
      height: '100vh',
    },
    chatInput: {
      enabledPlaceholderText: '메세지를 입력해주세요.',
    },
    chatInputAreaFocusedStyle: {
      outline: '1px solid #526931',
      boxShadow: 'none',
    },
    botCheckboxRowStyle: {
      width: '30%',
    },
    botCheckMarkStyle: {
      display: 'flex',
    },
    footer: {
      // text: (
      //   <div>
      //     <p className="footer-text">ChatGPT는 실수를 할 수 있습니다.</p>
      //     <p className="footer-text">보다 상세한 정보는 홈페이지를 이용하세요.</p>
      //   </div>
      // ),
    },
    footerStyle: {
      backgroundColor: '#ffffff',
    },
    fileAttachment: {
      showMediaDisplay: true,
    },
    emoji: {
      disabled: true,
    },
  };

  const helpOptions = ['사용방법', '재활용품 지원정책', '이미지'];
  const howToReCycle = ['재활용품 지원 정책', '물건 분리배출 방법'];

  const flow = {
    start: {
      message: '안녕하세요! Recycle ChatBot 입니다. 재활용품과 관련하여 궁금한 것이 있으시다면 무엇이든지 물어보세요!',
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
