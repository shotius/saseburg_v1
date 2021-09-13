import { Button, ButtonProps } from '@material-ui/core';
import React from 'react'

const CustomButton: React.FC<ButtonProps> = ({...props}) => {
    return (<Button {...props}></Button>);
}
export default CustomButton