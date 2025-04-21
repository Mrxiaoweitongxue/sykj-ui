import React, { FC, useState } from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';
import styles from './index.module.scss'
export interface ButtonPropsEx extends ButtonProps {
  onClick?: (args?: unknown) => Promise<unknown>
}
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ```javascript
 * import { Button } from 'sykj-ui'
 * ```
 */
export const Button: FC<ButtonPropsEx> = ({
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <AntdButton
      className={styles.button}
      loading={loading}
      disabled={loading}
      {...props}
      onClick={async (...args) => {
        const fn: unknown = props?.onClick && props.onClick(...args)
        if (fn instanceof Promise) {
          try {
            setLoading(true)
            await fn
          } finally {
            setLoading(false)
          }
        }
      }}
    >
      {props.children}
    </AntdButton>
  );
};
