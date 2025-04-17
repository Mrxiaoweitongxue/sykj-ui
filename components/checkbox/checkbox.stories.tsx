import { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxProps } from './checkbox'
import React from 'react'
export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta<CheckboxProps>

export const CheckboxComp: StoryObj<typeof Checkbox> = {
  render() {
    return <Checkbox />
  },
}
