import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { PrivateLayout } from '../PrivateLayout';
import { Posts } from 'src/components/organizms/Posts';

interface HomeTemplateProps {}

export const HomeTemplate: React.FC<HomeTemplateProps> = () => {
  return (
    <PrivateLayout>
      <Flex>
        <Box
          bg="#f2f2f4"
          w="240px"
          h="92vh"
          position="sticky"
          display={{ base: 'none', md: 'block' }}
        ></Box>
        <Flex
          justifyContent="space-between"
          w="full"
          bg="#f6f8fa"
          h="92vh"
          pt={['2', '4', '6']}
          px={['2', '4', '8']}
          shadow="-10px 10px 20px 0 rgba(0,0, 0, 0.07) "
          zIndex="docked"
        >
          <Box
            bg="white"
            border="1px"
            borderRadius="5px"
            borderColor="lightgray"
            flex={1}
            h="100px"
            p="10"
            mr={{ base: '0', lg: '8' }}
          >
            <Posts />
          </Box>
          <Box
            p="10"
            bg="white"
            border="1px"
            borderRadius="5px"
            borderColor="lightgray"
            flex={0.5}
            display={{ base: 'none', lg: 'block' }}
          >
            Stories
          </Box>
        </Flex>
      </Flex>
    </PrivateLayout>
  );
};
