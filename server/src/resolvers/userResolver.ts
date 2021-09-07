import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field({ nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]>{
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('credentials') credentials: UsernamePasswordInput
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(credentials.password);
    const user = User.create({
      username: credentials.username,
      email: credentials.email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }
    
    return { user }as UserResponse;
  }
}
