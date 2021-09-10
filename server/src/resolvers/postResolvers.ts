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

@Resolver()
export class PostResolvers {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await Post.find();
    return posts;
  }

  @Mutation(() => Post)
  @UseMiddleware(IsAuth)
  async createPost(@Arg('text') text: string, @Ctx() { req }: MyContext) {
    return Post.create({ text, creatorId: Number(req.session.userId) }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(IsAuth)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() {req} : MyContext
  ): Promise<boolean>{
    const post = await Post.findOne(id);
    if (!post) {
      throw new Error ('post already deleted');
    }
    if (req.session.userId === post?.creatorId){
      await Post.delete(id);
      return true;
    } else {
      throw new Error('Action Not Allowed');
    }
  }
}
