import { Params } from '../types/Params';

const handleUpload = (params: Params) => {
  // const files = params.files;
  console.log(params.files);
};

export const uploadFileFlow = {
  uploadFile_start: {
    message: '사진을 업로드 해주세요!',
    chatDisabled: true,
    file: (params: Params) => handleUpload(params),
    path: 'uploadFile_end',
  },
  reupload: {
    message: '새 사진을 업로드 해주세요!',
    file: (params: Params) => handleUpload(params),
    path: 'uploadFile_end',
  },
  uploadFile_end: {
    message: '보내주신 사진의 재활용법 입니다.',
    options: ['ReUpload'],
    chatDisabled: true,
    path: 'reupload',
  },
};
