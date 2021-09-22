import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Container } from '../../atoms/Container';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Box p={4} zIndex="modal">
      <Container maxW="1560px" variant="full">
        
      </Container>
    </Box>
  );
};
