import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { FindUserByEmail } from './dto/inputs/find-user-email.input';
import { UserObject } from './dto/objects/user.object';
import { UsersService } from './users.service';
import { FindUserByUUID } from './dto/inputs/find-user-uuid.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserObject])
  async listUsers(): Promise<UserObject[]> {
    return await this.usersService.findAllUsers();
  }

  @Query(() => UserObject)
  async findEmail(@Args('data') args: FindUserByEmail) {
    return await this.usersService.findUserByEmail(args.email);
  }

  @Query(() => UserObject)
  async findUUID(@Args('data') args: FindUserByUUID) {
    return await this.usersService.findUserByUUID(args.uuid);
  }

  @Mutation(() => UserObject)
  async createUser(@Args('data') args: CreateUserInput): Promise<UserObject> {
    return await this.usersService.createUser(args);
  }

  @Mutation(() => UserObject)
  async updateUser(@Args('data') args: UpdateUserInput) {
    return this.usersService.updateUser(args);
  }
}
