import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode ser estar vazio' })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @IsNotEmpty({ message: 'O campo password não pode ser estar vazio' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo name não pode ser estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo username não pode ser estar vazio' })
  username: string;
}
