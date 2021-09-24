import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import React from 'react'

interface PageLoadSpinnerProps {

}

export const PageLoadSpinner: React.FC<PageLoadSpinnerProps> = () => {
    return (<Center h="100vh">
      <Spinner />
    </Center>);
}