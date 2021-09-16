import { IsAuth } from './../utils/isAuth';
import { MyContext } from './../types';
import { Comment} from '../entities/Comment';

import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

@InputType()
class createPostInput {
  @Field()
  content: string;
  @Field()
  postId: number;
}

@Resolver()
export class CommentResolver {
  @Query(() => Comment)
  comment() {
    return;
  }

  @Query(() => [Comment])
  comments(@Arg('postId') postId: number) {
    return Comment.find({ where: { postId } });
  }

  // create
  @Mutation(() => Comment)
  @UseMiddleware(IsAuth)
  createComment(@Arg('input') input: createPostInput, @Ctx() { req }: MyContext) {
    return Comment.create({
      ...input,
      creatorId: Number(req.session.userId),
    }).save();
  }

  @Mutation(() => Comment)
  updateComment() {
    return;
  }

  @Mutation(() => Boolean)
  deleteComment() {
    return;
  }
}
