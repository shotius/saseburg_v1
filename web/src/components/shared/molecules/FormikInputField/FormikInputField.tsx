import { useField } from 'formik';
import React from 'react';
import { TextField } from '../../atoms/TextField/TextFieldBordered';
import { TextFieldProps } from '@material-ui/core';

interface InputFieldProps {
  name: string;
  label: string;
}

const FormikInputField: React.FC<InputFieldProps & TextFieldProps> = ({
  label, 
  name,
  ...props
}) => {
  const [field, { error, touched }] = useField({name});

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      id={name}
      label={label}
      variant="outlined"
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};
export default FormikInputField