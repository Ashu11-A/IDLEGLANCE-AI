import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  password?: string;
}
