import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { PrivateLayout } from '../PrivateLayout';
import { Posts } from 'src/components/organizms/Posts';

interface HomeTemplateProps {}

export const HomeTemplate: React.FC<HomeTemplateProps> = () => {
  return (
    <PrivateLayout>
      <Flex position="relative">
        <Box
          bg="#f2f2f4"
          position="fixed"
          top="72px"
          h="92vh"
          w="240px"
          display={{ base: 'none', md: 'block' }}
        >
         sider
        </Box>
        <Flex
          justifyContent="space-between"
          w="full"
          bg="#f6f8fa"
          h="300vh"
          pt={['2', '4', '6']}
          px={['2', '4', '8']}
          ml={{base: "0", md: "240px"}}
          shadow="-10px 10px 20px 0 rgba(0,0, 0, 0.07) "
          zIndex="docked"
          position="relative"
        >
          <Box
            bg="white"
            border="1px"
            borderRadius="5px"
            borderColor="lightgray"
            flex={1}
            p="10"
            mr={{ base: '0', lg: '8' }}
            h="200vh"
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
            top="97px"
            alignSelf="flex-start"
            position="sticky"

          >
            Sotry
          </Box>
        </Flex>
      </Flex>
    </PrivateLayout>
  );
};
