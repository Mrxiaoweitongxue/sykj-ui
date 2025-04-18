import { FC } from 'react';
import { Upload as AntdUpload } from 'antd';
import "./index.scss"
export interface UploadProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
export const Upload: FC<UploadProps> = () => {
  return (
    <AntdUpload className={'sykj-container'}>
      <div className={"sykj-upload"}>asdasd</div>
    </AntdUpload>
  );
};
