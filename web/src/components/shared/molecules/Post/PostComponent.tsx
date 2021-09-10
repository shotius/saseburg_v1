import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  TextareaAutosize,
} from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import React from 'react';
import IconButton from 'src/components/shared/atoms/Buttons/IconButton';
import { Post } from 'src/generated/graphql';
import profileAvatar from '../../../../assets/avatar/1.jpg';
import postOwnerAvatar from '../../../../assets/avatar/2.jpeg';
import useStyles from './styles';

interface PostProps {
  post: Partial<Post>;
}

const PostComponent: React.FC<PostProps> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="post owner avatar" src={postOwnerAvatar} />
          </ListItemAvatar>
          <ListItemText primary="Post Owner" secondary="Post date" />
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </ListItem>
        <ListItem>{props.post.text}</ListItem>
        <Divider />
        <ListItem className={classes.actionsToPost}>
          {/* likes */}
          <ListItemIcon>
            <IconButton>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText secondary={`${0} likes`} />
          {/* comments */}
          <ListItemIcon>
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText secondary={`${0} comments`} />
          {/* shares */}
          <ListItemIcon>
            <IconButton>
              <ShareOutlinedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText secondary={`${0} shares`} />
          {/* bookmarks */}
          <ListItemIcon className={classes.savedIcon}>
            <IconButton>
              <BookmarkBorderOutlinedIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText
            className={classes.savedIcon}
            secondary={`${0} saved`}
          />
        </ListItem>
        <Divider />
        {/* comment field */}
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="profile avatar" src={profileAvatar} />
          </ListItemAvatar>
          <TextareaAutosize
            aria-label="comment field"
            placeholder="Comment..."
            className={classes.commentField}
          />
          <Button color="primary">post</Button>
        </ListItem>
      </List>
    </Paper>
  );
};
export default PostComponent;
