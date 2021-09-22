import { Center, Container } from '@chakra-ui/react';
import React from 'react';
import { LoginForm } from '../../organizms/LoginForm';

interface LoginTemplateProps {}

export const LoginTemplate: React.FC<LoginTemplateProps> = () => {
  return (
    <Center h="80vh">
      <Container maxW="xs">
        <LoginForm />
      </Container>
    </Center>
  );
};
