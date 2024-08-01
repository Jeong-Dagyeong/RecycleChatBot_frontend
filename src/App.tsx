import ChatBot, { MessagesContext, Options } from 'react-chatbotify';
import { Params } from './types/Params';
import React, { useEffect, useState } from 'react';
import { districtFlow } from './flows/districtFlow';
import { uploadFileFlow } from './flows/uploadFileFlow';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import '../src/components/CheckBoxContainer.css';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type Message = {
  content: string;
  sender: string;
  type: string;
};

function App() {
  const [form, setForm] = React.useState<{ district: string }>({
    district: '',
  });
  const [messages, setMessages] = React.useState<Message[]>([]);

  const inputMessage = () => {
    setMessages((prev: Message[]) => {
      const newMessage = {
        content: '안녕',
        sender: 'boy',
        type: 'string',
      };
      return [...prev, newMessage];
    });
  };

  // const inputMessage = async (params : Params) => {
  //   const userMessage = params.userInput;
  //     try {
  //         const response = await axios.post('http://localhost:3000/', { userMessage });
  //         console.log(response.data);
  //         setMessages((prev: Message) => {
  //           return [...prev, response.data]
  //         });
  //       } catch (error) {
  //         console.error(error);
  //     }
  // };

  const options: Options = {
    theme: {
      embedded: true,
      primaryColor: '#526931',
      secondaryColor: '#526931',
    },
    // chatHistory: {
    //   storageKey: 'example_theming',
    // },
    header: {
      title: <h1 className="font-semibold">Recycle ChatBot</h1>,
      showAvatar: false,
    },
    chatWindowStyle: {
      backgroundColor: '#ffffff',
      width: '100%',
      height: '100vh',
    },
    chatInputAreaStyle: {
      // 타입에러
      // placeHolder: '메세지를 입력해주세요.',
    },
    chatInputAreaFocusedStyle: {
      outline: '1px solid #526931',
      boxShadow: 'none',
    },
    botCheckboxRowStyle: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // flexDirection: 'row'
      // flexDirecttion: 'row'
    },

    footer: {
      text: (
        <div>
          <span>Powered By </span>
          <span className="font-bold">
            <span>Recycle Team</span>
          </span>
        </div>
      ),
    },
    footerStyle: {
      backgroundColor: '#ffffff',
    },
    // advance: {
    //   useAdvancedMessages: true,
    // },
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
      // message: async (params: Params) => {
      //   console.log(params.userInput);
      //   const userMessage = params.userInput;
      //   try {
      //     const response = await axios.post('http://localhost:3000/', { userMessage });
      //     console.log(response.data);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      transition: { duration: 0 },
      chatDisabled: true,
      path: (params: Params) => {
        switch (params.userInput) {
          case '사용방법':
            return 'middle';
          case '재활용품 지원정책':
            return 'district_start';
          case '이미지':
            return 'uploadFile_start';
          case '재활용품 지원정책':
            return 'district_start';
          default:
            return 'default';
        }
      },
    },

    middle: {
      message: '저는 재활용품과 관련된 여러분들의 궁금증을 해결해 드리는 Recyle Chatbot 입니다. 2. 물건 분리배출 방법 안내 블라블라라라라라라',
      options: howToReCycle,
      path: 'process_options1',
    },

    process_options1: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: (params: Params) => {
        switch (params.userInput) {
          case '재활용품 지원 정책':
            return 'district_start';
          case '물건 분리배출 방법':
            return 'uploadFile_start';
          default:
            return 'start';
        }
      },
    },
    ...districtFlow({ form, setForm }),
    ...uploadFileFlow,
  };

  return (
    <>
      <Container>
        <button type="button" onClick={inputMessage} />
        <Box>
          {/* <MessagesContext.Provider value={{ messages: messages, setMessages: setMessages }}> */}
          <ChatBot options={options} flow={flow} />
          {/* </MessagesContext.Provider> */}
        </Box>
      </Container>
    </>
  );
}

export default App;
