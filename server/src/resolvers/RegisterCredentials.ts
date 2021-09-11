import { Sex } from 'src/types';
import {
  Field,
  InputType
} from 'type-graphql';


@InputType()
export class RegisterCredentials {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  sex: Sex;
  @Field()
  birthDate: Date;
  @Field()
  password: string;
  @Field()
  email: string;
}
