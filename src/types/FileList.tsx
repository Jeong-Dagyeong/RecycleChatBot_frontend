export type FileList = {
  readonly length: number;
  item(index: number): string | ArrayBuffer | null;
  [index: number]: File;
};
