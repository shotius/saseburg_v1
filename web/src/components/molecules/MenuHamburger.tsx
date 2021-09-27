import {
  Button,
  Icon, Menu,
  MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  // icon: IntrinsicAttributes & IconBaseProps
  icon: IconType
}

export const MenuHamburger: React.FC<Props> = ({icon: IconToShow}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        variant="solid"
        p="0"
        _hover={{
          bg: 'white',
        }}
      >
        <Icon as={IconToShow} color="#e8e8e8" boxSize="5" />
      </MenuButton>
      <MenuList zIndex="modal">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};
