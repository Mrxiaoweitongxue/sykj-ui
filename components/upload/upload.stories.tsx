import { Meta, StoryObj } from '@storybook/react'
import { Upload, UploadProps } from './upload'
import React from 'react'
export default {
  title: 'Upload',
  component: Upload,
} as Meta<UploadProps>

export const UploadComp: StoryObj<typeof Upload> = {
  render() {
    return <Upload />
  }
}
