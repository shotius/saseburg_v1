import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation()
  register(
    @Arg('credentials') credentials: 
  ) {

  }
}