import React, { Dispatch, SetStateAction } from 'react';
import { Params } from '../types/Params';
import Box from '@mui/material/Box';

type DistrictFlowProps = {
  form: { district: string };
  setForm: Dispatch<SetStateAction<{ district: string }>>;
};

export const districtFlow = ({ form, setForm }: DistrictFlowProps) => ({
  strict_start: {
    message: '안녕하세요! Recycle ChatBot 입니다. 서울특별시 구별 재활용품 지원정책에 대해 궁금한것이 있다면 무엇이든지 물어보세요.',
    checkboxes: { items: ['서초구', '광진구', '도봉구', '관악구', '강남구'], max: 1 },
    chatDisabled: true,
    function: (params: Params) => setForm({ ...form, district: params.userInput }),
    path: 'strict_end',
  },

  strict_end: {
    message: `서울특별시 ${form.district}의 결과는 다음과 같습니다.`,
    render: (
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <p>페트병 10개</p>
        <p>종량제 봉투 10L 1개</p>
      </Box>
    ),
  },
});
