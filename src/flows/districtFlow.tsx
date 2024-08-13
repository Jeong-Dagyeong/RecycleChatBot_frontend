import React, { Dispatch, SetStateAction } from 'react';
import { Params } from '../types/Params';
import Box from '@mui/material/Box';

type DistrictFlowProps = {
  form: { district: string };
  setForm: Dispatch<SetStateAction<{ district: string }>>;
};

const options = ['누리집(홈페이지) 바로가기', '처음으로'];

export const districtFlow = ({ form, setForm }: DistrictFlowProps) => ({
  district_start: {
    message: '안녕하세요! Seoul Rechat 입니다. \n서울특별시 구별 재활용품 지원정책에 대해 궁금한것이 있다면 무엇이든지 물어보세요.',
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
    },
    chatDisabled: true,
    function: (params: Params) => setForm({ ...form, district: params.userInput }),
    path: 'district_end',
  },

  district_end: {
    message: `서울특별시 ${form.district}의 결과는 다음과 같습니다.`,
    component: (
      <Box component="section" sx={{ p: 2, border: '1px solid grey', mt: 2, ml: 8.5 }}>
        <p>페트병 10개</p>
        <p>종량제 봉투 10L 1개</p>
      </Box>
    ),
    path: (params: Params) => {
      let url = '';
      // console.log(params.userInput);

      switch (params.userInput) {
        case '누리집(홈페이지) 바로가기':
          url = 'https://react-chatbotify.com/docs/introduction/quickstart/';
          window.open(url, '_blank');
          break;
        case '처음으로':
          return 'start';
        default:
          return 'communicate';
      }
    },
    options: options,
  },
});
