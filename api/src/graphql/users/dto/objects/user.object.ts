import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  userName: string;
}
