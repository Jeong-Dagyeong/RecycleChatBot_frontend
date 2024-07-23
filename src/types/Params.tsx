export type Params = {
  userInput: string; // 단일 선택값을 처리하기 위해 string 타입으로 정의합니다.
  injectMessage: (message: string) => Promise<void>; // injectMessage를 함수 타입으로 정의합니다.
  files?: FileList;
};
