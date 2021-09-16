import { IsAuth } from './../utils/isAuth';
import { MyContext } from './../types';
import { Post } from '../entities/Post';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../entities/User';

@Resolver()
export class PostResolvers {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await Post.find({relations: ["creator", "comments"]});
    return posts;
  }

  @Mutation(() => Post)
  @UseMiddleware(IsAuth)
  async createPost(@Arg('text') text: string, @Ctx() { req }: MyContext) {
    const post = Post.create({ text });
    const user = await User.findOne({ where: { id: req.session.userId } });
    if (user){
      post.creator = user;
      await post.save();
    }
    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(IsAuth)
  async deletePost(
    @Arg('id') id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      throw new Error('post already deleted');
    }
    if (req.session.userId === post.creator.id) {
      await Post.delete(id);
      return true;
    } else {
      throw new Error('Action Not Allowed');
    }
  }
}
