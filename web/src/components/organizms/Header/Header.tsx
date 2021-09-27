import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Divider, HStack, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsApp, BsFillQuestionCircleFill, BsSearch } from 'react-icons/bs';
import { FaBell, FaFacebookMessenger } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import { MdPersonAdd } from 'react-icons/md';
import { InputField } from 'src/components/molecules/InputField';
import { MenuHamburger } from 'src/components/molecules/MenuHamburger';
import { Container } from '../../atoms/Container';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <Box h="4.6rem" zIndex="modal" bg="white" position="sticky" top="0">
      <Container
        variant="large"
        display="flex"
        alignItems="center"
        h="100%"
        w="100%"
      >
        {/* logo */}
        <HStack mr={['auto', '20']}>
          <Icon as={BsApp} boxSize="10" color="#53a2ce" />
          <Text>Saseburg</Text>
        </HStack>
        {/* input */}
        <HStack
          ml={{ base: 'auto', md: '0' }}
          mr={{ md: 'auto' }}
          display={['none', 'inline-block']}
        >
          <Formik
            initialValues={{ search: '' }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <Form>
                <InputGroup>
                  <InputField
                    mt="-2"
                    h="10"
                    name="search"
                    placeholder="Search"
                    w={['2xxs', '2xxs', 'xs', 'xs', 'md']}
                    bg="#f6f8fa"
                    border="1px"
                    borderColor="lightgray"
                    focusBorderColor="red"
                    borderRadius="4px"
                  />
                  <InputRightElement>
                    <Button
                      type="submit"
                      h="2.35rem"
                      size="sm"
                      bg="#f6f8fa"
                      borderLeftRadius="none"
                      aria-label="search button"
                    >
                      <Icon as={BsSearch}></Icon>
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Form>
            )}
          </Formik>
        </HStack>
        {/* humburer menu */}
        <HStack display={{ md: 'none' }} ml="3">
          <MenuHamburger icon={AiOutlineMenu} />
        </HStack>
        {/* avatar */}
        <HStack display={{ base: 'none', md: 'flex' }}>
          <HStack display={{ base: 'none', lg: 'flex' }} mx="4" spacing={4}>
            <Avatar
              name="Code Beast"
              src="https://bit.ly/code-beast"
              h="10"
              w="10"
            />
            <HStack display={{ base: 'none', xl: 'flex' }}>
              <Text>Code Beaster</Text>
              <Divider orientation="vertical" h="40px" />
            </HStack>
            <Text>Create</Text>
            <Divider orientation="vertical" h="40px" />
            <Text>Home</Text>
          </HStack>
          {/* buttons */}
          <Button
            bg="white"
            size="sm"
            p="0"
            _hover={{
              bg: 'white',
              transform: 'scale(1.2) translateY(-0.27rem)',
            }}
          >
            <Icon as={FaFacebookMessenger} color="#b9e9f4" boxSize="7" />
          </Button>
          <Button
            bg="white"
            p="0"
            size="sm"
            _hover={{
              bg: 'white',
              transform: 'scale(1.2) translateY(-0.27rem)',
            }}
          >
            <Icon as={FaBell} color="#b9e9f4" boxSize="6" />
          </Button>
          <Button
            bg="white"
            variant="solid"
            p="0"
            _hover={{
              bg: 'white',
            }}
          >
            <Icon as={MdPersonAdd} color="#e8e8e8" boxSize="6" />
          </Button>
          <Button
            bg="white"
            variant="solid"
            p="0"
            _hover={{
              bg: 'white',
            }}
          >
            <Icon as={BsFillQuestionCircleFill} color="#e8e8e8" boxSize="5" />
          </Button>
          <MenuHamburger icon={GoTriangleDown} />
        </HStack>
      </Container>
    </Box>
  );
};
