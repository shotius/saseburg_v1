import { Box, Flex, HStack } from '@chakra-ui/layout';
import React from 'react';
import { PrivateLayout } from '../PrivateLayout';

interface HomeTemplateProps {}

export const HomeTemplate: React.FC<HomeTemplateProps> = () => {

  return (
    <PrivateLayout>
      <Flex>
        <Box bg="gray.200" w="240px" h="92vh" position="sticky" display={{base: "none", md: "block"}}>
          Sider
        </Box>
        <Flex
          justifyContent="space-between"
          w="full"
          bg="aliceblue"
          h="92vh"
          pt={["2", "4", "6"]}
          px={["2", "4", "8"]}
          shadow="-10px 1px 20px 0 rgba(0,0, 0, 0.1) "
          zIndex="overlay"
        >
          <Box
            bg="green"
            flex={1}
            h="100px"
            mr={{base: "0", lg: "8"}}
          >
            Posts
          </Box>
          <Box bg="purple" flex={.5} display={{base: "none", lg: "block"}}>
            Stories
          </Box>
        </Flex>
      </Flex>
    </PrivateLayout>
  );
};
