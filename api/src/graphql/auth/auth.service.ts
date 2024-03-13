import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/inputs/auth.input';
import { compareSync } from 'bcrypt';
import { AuthObject } from './dto/objects/auth.object';
import { UserObject } from '../users/dto/objects/user.object';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthObject> {
    const user = await this.userService.findUserByEmail(data.email);
    const validPassoword = compareSync(data.password, user.password);

    if (!validPassoword)
      throw new UnauthorizedException('Incorret Passoword or Email');

    const acessToken = await this.jwtToken(user);

    return {
      user,
      acessToken,
    };
  }

  private async jwtToken({
    uuid,
    name,
    username,
    email,
  }: UserObject): Promise<string> {
    const payload = {
      uuid,
      name,
      username,
      email,
    };

    return this.jwtService.signAsync(payload);
  }
}
