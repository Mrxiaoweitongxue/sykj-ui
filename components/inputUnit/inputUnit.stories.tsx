import { Meta, StoryObj } from '@storybook/react'
import { InputUnit, InputUnitProps } from './inputUnit'
import React from 'react'
export default {
  title: 'InputUnit',
  component: InputUnit,
} as Meta<InputUnitProps>

export const InputUnitCom: StoryObj<typeof InputUnit> = {
  render() {
    return <InputUnit />
  }
}
