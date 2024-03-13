import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthObject } from './dto/objects/auth.object';
import { AuthInput } from './dto/inputs/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthObject)
  public async login(@Args('data') data: AuthInput): Promise<AuthObject> {
    const { acessToken, user } = await this.authService.validateUser(data);

    return {
      user,
      acessToken,
    };
  }
}
