import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import { useFormikContext } from 'formik';
import React from 'react';

type FileInputProps = {
  name: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panoroma: {
      color: theme.palette.text.secondary,
    },
    fileInput: {
      display: "none"
    }
  })
);

const FileInput: React.FC<FileInputProps> = ({ name }) => {
  const classes = useStyles();
  const { setFieldValue,  } = useFormikContext();

  return (
    <>
      <input
        name={name}
        multiple
        accept="image/*"
        id="file-up"
        className={classes.fileInput}
        type="file"
        // value={}
        onChange={(e) => {
          // const files = e.target.files;
          // console.log(files)
          // let myFiles = Array.from(files);
          // const files
          // setFieldValue('images', myFiles);
          setFieldValue(name, e.target.files)
        }}
      />
      <label htmlFor="file-up">
        <Button component="span">
          <PanoramaOutlinedIcon className={classes.panoroma} fontSize="large" />
        </Button>
      </label>
    </>
  );
};
export default FileInput;
