import { Theme } from '@material-ui/core';
import { createStyles, makeStyles,} from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import React from 'react';

interface PostCommentProps {
  comment: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  commentBox: {
    wordWrap: "break-word",
    padding: ".5rem",
    backgroundColor: "lightgray",
    whiteSpace: "pre-line",
    borderRadius: "20px",
    margin: "1rem"
  } 
}));

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  const classes  = useStyles()
  return (
    <Box className={classes.commentBox}>
      {comment}
    </Box>
  );
};

export default PostComment;
