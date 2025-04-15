import { FC, useState } from 'react';

import { Button as AntButton, ButtonProps } from 'antd';

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
    <AntButton
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
    </AntButton>
  );
};
