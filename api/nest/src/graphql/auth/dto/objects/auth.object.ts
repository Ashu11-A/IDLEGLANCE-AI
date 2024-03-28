import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from 'src/graphql/users/dto/objects/user.object';

@ObjectType()
export class AuthObject {
  @Field(() => UserObject)
  user: UserObject;
  @Field(() => String)
  acessToken: string;
}
