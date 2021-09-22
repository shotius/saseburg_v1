import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Container } from '../../atoms/Container';
import { Header } from '../../organizms/Header';

interface PrivateLayoutProps {}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container p={0} variant="full" bg="gray">
        {children}
      </Container>
    </Box>
  );
};