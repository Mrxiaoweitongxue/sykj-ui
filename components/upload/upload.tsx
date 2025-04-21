import React, { FC } from 'react';
import { Upload as AntdUpload } from 'antd';
import styles from "./index.module.scss"
export interface UploadProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
export const Upload: FC<UploadProps> = () => {
  return (
    <AntdUpload className={styles['sykj-container']}>
      <div className={styles["sykj-upload"]}>asdasd</div>
    </AntdUpload>
  );
};
