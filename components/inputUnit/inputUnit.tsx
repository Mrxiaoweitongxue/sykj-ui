import { FC } from 'react';
import { Input, Select } from 'antd';
import "./inputUnit.scss"
export interface InputUnitProps {
  name?: string
}
export const InputUnit: FC<InputUnitProps> = () => {
  return (<>
    <Input></Input>
    <Select></Select>
  </>
  );
};
