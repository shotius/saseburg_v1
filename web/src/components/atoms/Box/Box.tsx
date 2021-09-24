import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';

interface Props {
}

const CustomBox: React.FC<Props & BoxProps> = ({ children, ...rest }) => {
  return <Box {...rest}>{children} </Box>;
};
export default CustomBox;
