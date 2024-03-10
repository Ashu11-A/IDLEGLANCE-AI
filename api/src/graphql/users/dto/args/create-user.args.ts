import { ArgsType, Field } from '@nestjs/graphql';
import { UserInput } from '../inputs/user.input';

@ArgsType()
export class CreateUserArgs {
  @Field()
  data: UserInput;
}
