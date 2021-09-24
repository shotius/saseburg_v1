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
          position="fixed"
          h="92vh"
          w="240px"
          t="0"
          l="0"
          display={{ base: 'none', md: 'block' }}
        >
          sdfasdf
        </Box>
        <Flex
          justifyContent="space-between"
          w="full"
          bg="#f6f8fa"
          h="200vh"
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
            position="sticky"
            top="97px"
          >
            <Posts />
          </Box>
          <Box
            className="shaky"
            p="10"
            bg="white"
            border="1px"
            borderRadius="5px"
            borderColor="lightgray"
            flex={0.5}
            display={{ base: 'none', lg: 'block' }}
            top="97px"
            alignSelf="flex-start"
          >
            Sotry
          </Box>
        </Flex>
      </Flex>
    </PrivateLayout>
  );
};
