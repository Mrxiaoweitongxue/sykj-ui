import { FC } from 'react';

import "./upload.scss"
export interface UploadProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
export const Upload: FC<UploadProps> = () => {
  return (
    <div className='sykj-container'>
      <div className='sykj-upload'>上传</div>
    </div>
  );
};
