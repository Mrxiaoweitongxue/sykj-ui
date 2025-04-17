import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonPropsEx } from './button'
import { userEvent, within, expect } from '@storybook/test';
import { action } from '@storybook/addon-actions'
import React from 'react';
export default {
  title: 'Button',
  component: Button,
} as Meta<ButtonPropsEx>
export const 包装按钮: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: 'AutoLoadingButton',
    onClick: (eve) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2)
          action('clicked', { clearOnStoryChange: true })(eve)
        }, 2000)
      })
    }
  },
  play: async (props) => {
    const { canvasElement } = props
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByRole('button')).toHaveClass('ant-btn-loading')
    await new Promise((resolve) => {
      setTimeout(async () => {
        resolve(true)
      }, 2200);
    })
    await expect(canvas.getByRole('button')).not.toHaveClass('ant-btn-loading')
  },
}
/**
 * 
 * <a href="https://ant.design/components/button-cn" target="_blank">ant-button</a>
 * 
 */

export const antd按钮 = () => <>
  <Button>默认按钮</Button>
  <Button type='primary'>primary按钮</Button>
</>