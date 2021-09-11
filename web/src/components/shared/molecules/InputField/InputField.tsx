import { useField } from 'formik';
import React from 'react';
import { TextField } from '../../atoms/TextField/TextFieldBordered';

interface InputFieldProps {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...rest }) => {
  const [field, { error, touched }] = useField(rest);
  return <TextField {...field} {...rest} error={touched && Boolean(error)} label={label} />;
};
