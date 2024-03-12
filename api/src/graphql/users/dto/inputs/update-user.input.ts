import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  username?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode ser estar vazio' })
  @Field({ nullable: true })
  email?: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @IsOptional()
  @Field({ nullable: true })
  password?: string;
}
