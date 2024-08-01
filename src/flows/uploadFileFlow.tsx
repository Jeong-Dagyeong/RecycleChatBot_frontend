// import { useRef, useState } from 'react';
import { Params } from '../types/Params';
import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';

// const [getImages, setGetImages] = useState<{ image: string | undefined }>({ image: '' });

// const [getImages, setGetImages] = useState<any[]>([]);

// type ImageUploadProps = {
//   getImages: { image: string };
//   setGetImages: Dispatch<SetStateAction<{ image: string }>>;
//   params: Params;
//   // file: FileList
// };

// const imgRef = useRef(null);

export const handleUpload = (params: Params) => {
  // const [getImages, setGetImages] = useState <{ image: string | undefined }>({ image: '' });
  // const file = imgRef.current?.files[0];
  // if(!file) {
  //   return;
  // }

  // const reader = new FileReader();
  // console.log(imgRef.current);

  // reader.readAsDataURL(file);
  // reader.onload = () => {
  //   setGetImages({ ...getImages, item: reader.result });
  //   // setGetImages(reader.result)
  //   // console.log(setGetImages);
  // };

  console.log(params.files);
};

export const uploadFileFlow = {
  uploadFile_start: {
    message: '사진을 업로드 해주세요!',
    chatDisabled: true,
    // render: (
    //   <Tooltip title="Add" placement="top">
    //     <Button>top</Button>
    //   </Tooltip>
    // ),
    file: (params: Params) => handleUpload(params),
    path: 'uploadFile_end',
  },
  reupload: {
    message: '다른 사진을 업로드 해주세요!',
    file: (params: Params) => handleUpload(params),
    path: 'uploadFile_end',
  },
  uploadFile_end: {
    message: '보내주신 사진의 재활용법 입니다.',
    render: (
      <Card sx={{ maxWidth: 345 }}>
        <img src="../../asset/콩떡이.jpeg" />
      </Card>
    ),
    // 추가로 처음으로 버튼 생성
    options: ['다른 사진 업로드 하기'],
    chatDisabled: true,
    path: 'reupload',
  },
};
