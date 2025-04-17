import { FC } from 'react'
import { Checkbox as AntdCheckbox } from 'antd'
import './checkbox.scss'
export interface CheckboxProps {
  name?: string
}
export const Checkbox: FC<CheckboxProps> = () => {
  return <AntdCheckbox></AntdCheckbox>
}
