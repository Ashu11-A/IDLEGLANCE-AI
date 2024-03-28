import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field(() => ID)
  id: number;

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @HideField()
  password?: string;
}
