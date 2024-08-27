import { Dispatch, SetStateAction } from 'react';
import { Params } from '../types/Params';
import Card from '@mui/material/Card';
import axios from 'axios';

type DistrictFlowProps = {
  form: { district: string };
  setForm: Dispatch<SetStateAction<{ district: string }>>;
};

export const handleUpload = async (params: Params, { form, setForm }: DistrictFlowProps) => {
  const uploadFile = params.files?.[0];

  if (uploadFile) {
    const formData = new FormData();
    formData.append('image_file', uploadFile);
    formData.append('district_name', form.district);

    // 디버깅을 위한 FormData 내용 출력 (Array.from 사용)
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (typeof value === 'string') {
        console.log(`${key}: ${value} (string)`);
      } else if (value instanceof File) {
        console.log(`${key}: ${value.name} (File)`);
      }
    });

    try {
      console.log('지역 이름:', form.district);
      console.log('업로드할 파일:', uploadFile);

      const response = await axios.post('http://3.219.73.203:8000/chatbot/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          district_name: form.district,
        },
      });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('파일 업로드 중 에러 발생:', error);
    }
  } else {
    console.error('업로드할 파일이 없습니다.');
  }
};

export const uploadFileFlow = ({ form, setForm }: DistrictFlowProps) => ({
  uploadFile_district: {
    message: '대형 페기물 수거 정보를 알고싶은 구를 선택해 주세요.',
    checkboxes: {
      items: [
        '강남구',
        '강동구',
        '강북구',
        '강서구',
        '관악구',
        '광진구',
        '구로구',
        '금천구',
        '노원구',
        '도봉구',
        '동대문구',
        '동작구',
        '마포구',
        '서대문구',
        '서초구',
        '성동구',
        '성북구',
        '송파구',
        '양천구',
        '영등포구',
        '용산구',
        '은평구',
        '종로구',
        '중구',
        '중랑구',
      ],
      max: 1,
      chatDisabled: true,
    },
    function: async (params: Params) => {
      setForm({ ...form, district: params.userInput });
      //   const url = 'http://54.174.172.76:8000/chatbot/upload';

      //   const district_name = params.userInput;

      //   console.log('district_name', district_name);
      //   try {
      //     const response = await axios.post(url, { district_name: district_name });
      //     console.log(response);
      //     // console.log(typeof response);
      //     // console.log(typeof district_name);
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
    path: 'uploadFile_start',
  },

  uploadFile_start: {
    message: '사진을 업로드 해주세요!',
    chatDisabled: true,
    file: (params: Params) => {
      handleUpload(params, { form, setForm });
      // console.log('form', form);
      // console.log('params', params);
    },
    path: 'uploadFile_end',
  },
  re_upload: {
    message: '다른 사진을 업로드 해주세요!',
    chatDisabled: true,
    file: (params: Params) => {
      handleUpload(params, { form, setForm });
    },
    path: 'uploadFile_end',
  },
  uploadFile_end: {
    message: '보내주신 사진의 재활용법 입니다.',
    component: <Card sx={{ maxWidth: 345 }}>{/* <img src=`{}` /> */}</Card>,
    options: ['다른사진 업로드 하기', '처음으로'],
    chatDisabled: false,
    path: (params: Params) => {
      switch (params.userInput) {
        case '다른사진 업로드 하기':
          return 're_upload';
        case '처음으로':
          return 'start';
        default:
          return 'communicate';
      }
    },
  },
});
