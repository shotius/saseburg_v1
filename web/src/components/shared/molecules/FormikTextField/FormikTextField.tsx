import { TextareaAutosize, TextareaAutosizeProps } from '@material-ui/core';
import { useField } from 'formik';

interface TextFieldProps {
  name: string;
}

const FormikTextField: React.FC<TextareaAutosizeProps & TextFieldProps> = ({
  name,
  ...props
}) => {
  const [field] = useField({name})
  return <TextareaAutosize {...field} {...props} />;
};
export default FormikTextField;
