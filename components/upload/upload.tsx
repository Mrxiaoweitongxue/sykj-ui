import { FC } from 'react';
import { Upload as AntdUpload } from 'antd';
import "./upload.scss"
export interface UploadProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
export const Upload: FC<UploadProps> = () => {
  return (
    <div className='sykj-container'>
      <AntdUpload className='sykj-upload'>上传</AntdUpload>
    </div>
  );
};
