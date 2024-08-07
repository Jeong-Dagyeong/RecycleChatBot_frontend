import { Params } from '../types/Params';
import Card from '@mui/material/Card';

export const handleUpload = async (params: Params) => {
  const formData = new FormData();
  // console.log(formData);
  // const blob = new Blob["hello", { type : multi}]
  console.log('params.files', params.files);
  const photo = params.files;
  // formData.append('photo', JSON.stringify(params.files));
  // axios.post('http://localhost:3000', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
};

export const uploadFileFlow = {
  uploadFile_start: {
    message: '사진을 업로드 해주세요!',
    chatDisabled: true,
    // render: (
    // <Tooltip title="Add" placement="top">
    //   <Button>top</Button>
    // </Tooltip>
    // ),
    file: (params: Params) => {
      handleUpload(params);
    },
    path: 'uploadFile_end',
  },
  reupload: {
    message: '다른 사진을 업로드 해주세요!',
    file: (params: Params) => handleUpload(params),
    path: 'uploadFile_end',
  },
  uploadFile_end: {
    message: '보내주신 사진의 재활용법 입니다.',
    render: <Card sx={{ maxWidth: 345 }}>{/* <img src=`{}` /> */}</Card>,
    // 추가로 처음으로 버튼 생성
    options: ['다른 사진 업로드 하기'],
    chatDisabled: false,
    path: 'communicate',
  },
};
