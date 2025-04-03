import type { Preview } from '@storybook/react'
import { action } from '@storybook/addon-actions'
const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  args: {
    onClick: action('clicked')
  },
  tags: ['autodocs']
};

export default preview;