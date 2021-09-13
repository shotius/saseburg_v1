import React from "react";
import { Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'; 
import { useField, useFormikContext } from "formik";

type FileInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  panoroma: {
    color: theme.palette.text.secondary
  }
}))

const FileInput: React.FC<FileInputProps> = ({name, ...props}) => {
  const classes = useStyles()
  const [field] = useField({name})
  const {setFieldValue} = useFormikContext()

  return (
    <>
      <input
        {...field}
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(e) => {
          // setFieldValue(name, e.target.files)
        }}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">
          <PanoramaOutlinedIcon className={classes.panoroma} fontSize="large"/>
        </Button>
      </label>
    </>
  );
};
export default FileInput;
