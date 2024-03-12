import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User } from '@prisma/client';
import { UserObject } from './dto/objects/user.object';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const existUser = this.findUserByEmail(data.email);

    if (existUser)
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);

    try {
      const user = await this.prismaService.user.create({
        data,
      });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        'Não foi possivel criar o usuário no Banco de dados!',
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserObject> {
    return await this.prismaService.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }

  async findUserByUUID(uuid: string): Promise<UserObject> {
    return await this.prismaService.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  async findAllUsers(): Promise<UserObject[]> {
    const users = await this.prismaService.user.findMany();
    console.log(users);
    return users;
  }
}
