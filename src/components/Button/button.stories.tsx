import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonPropsEx } from './button'
import { userEvent, within, expect } from '@storybook/test';
import { action } from '@storybook/addon-actions'
export default {
  title: 'Button',
  component: Button,
} as Meta<ButtonPropsEx>
export const AutoLoadingButton: StoryObj<typeof Button> = {
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
    setTimeout(async () => {
      await expect(canvas.getByRole('button')).not.toHaveClass('ant-btn-loading')
    }, 3000);
  },
}
