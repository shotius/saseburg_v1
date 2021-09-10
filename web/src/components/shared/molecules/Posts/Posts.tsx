import React from 'react';
import { PostsQuery } from 'src/generated/graphql';
import PostComponent from '../Post/PostComponent';

type PostsListsProps = Pick<PostsQuery, 'posts'>;

const PostsLists: React.FC<PostsListsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostComponent post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsLists;
