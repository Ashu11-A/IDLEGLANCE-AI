import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserArgs } from './dto/args/create-user.args';
import { UserObject } from './dto/objects/user.object';

@Resolver()
export class UsersResolver {
  constructor(private readonly prismaService: PrismaService) {}
  @Query(() => String)
  users(): string {
    return 'Hello World';
  }
  @Mutation(() => UserObject)
  async createUser(@Args() args: CreateUserArgs): Promise<UserObject> {
    const { data } = args;
    console.log(args);
    await this.prismaService.user.create({
      data: {
        ...data,
      },
    });
    return data;
  }
}
