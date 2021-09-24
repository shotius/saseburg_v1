import {
  FormControl, FormErrorMessage, FormLabel,
  Input,
  InputProps
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = InputProps & {
  name: string;
  label?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props.name);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};