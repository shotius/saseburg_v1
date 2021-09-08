import { MyContext } from './../types';
import argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import { registerValidation } from '../validation/registerValidation';
import { FieldError } from './FieldError';
import { UsernamePasswordInput } from './UsernamePasswordInput';

@InputType()
class LoginInput {
  @Field()
  usernameOrEmail: string;
  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field({ nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') input: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const user = await User.findOne(
      input.usernameOrEmail.includes('@')
        ? { where: { email: input.usernameOrEmail } }
        : { where: { username: input.usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username does not exist',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password is incorect',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('credentials') credentials: UsernamePasswordInput
  ): Promise<UserResponse> {
    // validate input
    const errors = registerValidation(credentials);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(credentials.password);
    const user = User.create({
      username: credentials.username,
      email: credentials.email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already exists",
            },
            {
              field: "email",
              message: "email already exist",
            },
          ],
        };
      }
    }

    return { user } as UserResponse;
  }
}
