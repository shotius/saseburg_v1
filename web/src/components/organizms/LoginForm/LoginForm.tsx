import { Button } from '@chakra-ui/button';
import { Heading, VStack } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { useLoginMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';
import { InputField } from '../../molecules/InputField';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [, login] = useLoginMutation();
  const history = useHistory()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, {setErrors}) => {
        const result = await login({
          loginInput: { email: values.email, password: values.password },
        });
        console.log(result)
        if (result.data?.login.errors) {
          const mappedErrors = toErrorMap(result.data.login.errors)
          console.log(mappedErrors)
          setErrors(mappedErrors)
        }
        if (result.data?.login.user) {
          history.push('/home')
        }
      }}
    >
      {() => (
        <Form>
          <VStack spacing={3}>
            <Heading>Login</Heading>
            <InputField name="email" label="Email" placeholder="Email" />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit" w="full" colorScheme="blue" variant="solid">
              Login
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};
