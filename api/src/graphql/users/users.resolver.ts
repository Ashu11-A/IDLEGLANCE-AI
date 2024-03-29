import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UserObject } from './dto/objects/user.object';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/acessToken.guard';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserObject])
  async listUsers(): Promise<UserObject[]> {
    return await this.usersService.findAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserObject)
  async findEmail(@Args('email') email: string) {
    return await this.usersService.findUserByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserObject)
  async findUUID(@Args('uuid') uuid: string) {
    return await this.usersService.findUserByUUID(uuid);
  }

  @Mutation(() => UserObject)
  async createUser(@Args('data') args: CreateUserInput): Promise<UserObject> {
    return await this.usersService.createUser(args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserObject)
  async updateUser(
    @Args('uuid') uuid: string,
    @Args('data') args: UpdateUserInput,
  ) {
    return this.usersService.updateUser(uuid, args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('uuid') uuid: string) {
    return await this.usersService.deleteUser(uuid);
  }
}
