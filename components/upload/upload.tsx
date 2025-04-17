import { FC } from 'react';
import { Upload as AntdUpload } from 'antd';
import { Button } from '../button/button';
import "./upload.scss"
export interface UploadProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
export const Upload: FC<UploadProps> = () => {
  return (
    <AntdUpload><Button>上传</Button></AntdUpload>
  );
};
