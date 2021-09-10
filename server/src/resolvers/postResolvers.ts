import { Post } from "../entities/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolvers {
  @Query(() => [Post])
  async posts(): Promise<Post[]>{
    const posts = await Post.find();
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('text') text: string
  ): Promise<Post>{
    return Post.create({text}).save();
  }
}