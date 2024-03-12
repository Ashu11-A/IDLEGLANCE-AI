import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindUserByUUID {
  @IsNotEmpty()
  uuid: string;
}