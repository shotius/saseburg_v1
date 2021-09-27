import { Container, ContainerProps } from '@chakra-ui/layout';
import React from 'react';

interface Props {
  variant: 'large' | 'medium' | 'small';
}

const CustomContainer: React.FC<Props & ContainerProps> = ({
  variant,
  children,
  ...rest
}) => {
  return (
    <Container
      maxW={
        variant === 'large' ? '1560px' : variant === 'small' ? '400px' : '600px'
      }
      {...rest}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
