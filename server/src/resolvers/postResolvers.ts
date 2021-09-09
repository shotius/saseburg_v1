import { Post } from "../entities/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolvers {
  @Query(() => [Post])
  async posts(): Promise<Post[]>{
    const posts = await Post.find();
    return posts;
  }
}