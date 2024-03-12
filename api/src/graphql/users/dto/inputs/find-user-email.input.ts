import { InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class FindUserByEmail {
  @IsEmail()
  email: string;
}
