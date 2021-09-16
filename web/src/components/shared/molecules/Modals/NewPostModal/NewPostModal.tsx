import { Divider } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
// import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
// import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import Box from 'src/components/shared/atoms/Box';
import IconButton from 'src/components/shared/atoms/Buttons/IconButton';
import { TextAreaAutoSize } from 'src/components/shared/atoms/TextAreaAutoSize';
import { Typography } from 'src/components/shared/atoms/Typography';
import { useCreatePostMutation } from 'src/generated/graphql';
import ButtonSubmit from '../../../atoms/Buttons/ButtonSubmit';
import FileInput from '../../inputs/FileInput';
import useStyles from './style';

const NewPostModal: React.FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [, createPost] = useCreatePostMutation();

  const handleClose = () => setOpen(false);

  // handle create new postonChange
  // const handleNewPost = async (e: React.FormEvent) => {
  // e.preventDefault();
  // @ts-ignore
  // const files = new FormData();
  // const buffer = Array.from(images)
  // const imagBlob = buffer.map(file => URL.createObjectURL(file))
  // files.append('images', images)
  // console.log(files);
  // console.log(postContent);
  // console.log(images);
  // axios.post("")
  // };

  return (
    <div>
      <div onClick={() => setOpen(true)}>{props.children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box component="div" className={classes.header}>
              <IconButton onClick={handleClose} className={classes.closeModal}>
                <CloseOutlinedIcon fontSize="medium" />
              </IconButton>
              <Typography variant="h5">Creating a Post</Typography>
            </Box>
            <Divider />
            <Formik
              initialValues={{ text: '', images: '' }}
              onSubmit={async (values) => {
                console.log(values.images)
                await createPost({ text: values.text });
                handleClose();
              }}
            >
              {(props) => (
                <Form>
                  <TextAreaAutoSize
                    required
                    name="text"
                    autoFocus
                    minRows={5}
                    onChange={props.handleChange}
                    placeholder="Write a post"
                    className={classes.textArea}
                  />
                  <div>{props.values.images && <h1>show Images</h1>}</div>
                  <Box className={classes.extras}>
                    <FileInput name="images" />
                    
                    <IconButton>
                      <SentimentVerySatisfiedOutlinedIcon
                        fontSize="large"
                        className={classes.emoji}
                      />
                    </IconButton>
                  </Box>
                  <ButtonSubmit color="primary">Post</ButtonSubmit>
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default NewPostModal;
