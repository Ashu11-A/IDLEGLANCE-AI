import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
