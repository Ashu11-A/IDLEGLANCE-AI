import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UserObject } from './dto/objects/user.object';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserObject])
  async listUsers(): Promise<UserObject[]> {
    return await this.usersService.findAllUsers();
  }

  @Query(() => UserObject)
  async findEmail(@Args('email') email: string) {
    return await this.usersService.findUserByEmail(email);
  }

  @Query(() => UserObject)
  async findUUID(@Args('uuid') uuid: string) {
    return await this.usersService.findUserByUUID(uuid);
  }

  @Mutation(() => UserObject)
  async createUser(@Args('data') args: CreateUserInput): Promise<UserObject> {
    return await this.usersService.createUser(args);
  }

  @Mutation(() => UserObject)
  async updateUser(
    @Args('uuid') uuid: string,
    @Args('data') args: UpdateUserInput,
  ) {
    return this.usersService.updateUser(uuid, args);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('uuid') uuid: string) {
    return await this.usersService.deleteUser(uuid);
  }
}
