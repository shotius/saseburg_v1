import React from 'react';
import { PostsQuery } from 'src/generated/graphql';
import PostComment from './PostComment';

interface PostCommentsProps {
  comments: PostsQuery['posts'][0]['comments'];
}

const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  return (
    <div>
      {comments?.map((comment, i) => (
        <PostComment key={i} comment={comment.content}/>
      ))}
    </div>
  );
};
export default PostComments;
