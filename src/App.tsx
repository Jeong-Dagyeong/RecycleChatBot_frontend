import ChatBot from 'react-chatbotify';
import { Params } from './types/Params';
import React from 'react';
import { districtFlow } from './flows/districtFlow';
import { uploadFileFlow } from './flows/uploadFileFlow';

function App() {
  const [form, setForm] = React.useState<{ district: string }>({
    district: '',
  });

  const options = {
    theme: {
      embedded: true,
      primaryColor: '#526931',
      secondaryColor: '#526931',
    },
    chatHistory: {
      storageKey: 'example_theming',
    },
    header: {
      title: <h1 className="font-semibold">Recycle ChatBot</h1>,
      showAvatar: false,
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
  };

  const helpOptions = ['지역구 선택', '이미지로 물어보기'];

  const flow = {
    start: {
      message: '안녕하세요! Recycle ChatBot 입니다. 서울특별시 구별 재활용품 지원정책에 대해 궁금한것이 있다면 무엇이든지 물어보세요.',
      options: helpOptions,
      path: 'process_options',
    },

    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: (params: Params) => {
        switch (params.userInput) {
          case '지역구 선택':
            return 'strict_start';
          case '이미지로 물어보기':
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
    <div className="App">
      <ChatBot options={options} flow={flow} />
    </div>
  );
}

export default App;
