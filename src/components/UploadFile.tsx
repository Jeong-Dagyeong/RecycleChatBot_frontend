// // import path from 'path';
// // import React from 'react';
// import ChatBot from 'react-chatbotify';
// import { Params } from '../types/Params';

// export default function UploadFile() {
//   const handleUpload = (params: Params) => {
//     // const files = params.files;
//     console.log(params.files);
//   };

//   const options = {
//     theme: {
//       embedded: true,
//       primaryColor: '#526931',
//       secondaryColor: '#526931',
//     },
//     chatHistory: {
//       storageKey: 'example_theming',
//     },
//     header: {
//       title: <h1 className="font-semibold">Recycle ChatBot</h1>,
//       showAvatar: false,
//     },
//     footer: {
//       text: (
//         <div>
//           <span>Powered By </span>
//           <span className="font-bold">
//             <span>Recycle Team</span>
//           </span>
//         </div>
//       ),
//     },
//   };

//   const flow = {
//     start: {
//       message: '사진을 업로드 해주세요!',
//       chatDisabled: true,
//       file: (params: Params) => handleUpload(params),
//       path: 'end',
//     },
//     reupload: {
//       message: '새 사진을 업로드 해주세요!',
//       file: (params: Params) => handleUpload(params),
//       path: 'end',
//     },
//     end: {
//       message: '보내주신 사진의 재활용법 입니다.',
//       options: ['ReUpload'],
//       chatDisabled: true,
//       path: 'reupload',
//     },
//   };
//   return <ChatBot options={options} flow={flow} />;
// }

export {};
