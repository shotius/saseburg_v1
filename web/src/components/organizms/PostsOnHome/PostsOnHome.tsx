import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import PostsLists from "src/components/shared/molecules/Posts";
import { usePostsQuery } from "src/generated/graphql";
import NewPostForm from "../../shared/molecules/Forms/NewPost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: "100%",
      // maxWidth: contentWrapperWidth,
      // padding: theme.spacing(3),
      
    },
  })
);

const Main: React.FC = () => {
  const classes = useStyles();
  // const { posts } = useAppSelector((state) => state.posts);
  // const dispatch = useAppDispatch();

  const [{data}] = usePostsQuery()

  return (
    <main className={classes.root}>
      <NewPostForm />
      {data && <PostsLists posts={data.posts} />}
    </main>
  );
};
export default Main;
