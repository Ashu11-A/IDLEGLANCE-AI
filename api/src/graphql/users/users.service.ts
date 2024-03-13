import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User } from '@prisma/client';
import { UserObject } from './dto/objects/user.object';
import { UpdateUserInput } from './dto/inputs/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const existUser = await this.findUserByEmail(data.email);

    if (existUser)
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);

    try {
      const user = await this.prismaService.user.create({
        data,
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Não foi possivel criar o usuário no Banco de dados!',
      );
    }
  }

  async updateUser(uuid: string, data: UpdateUserInput) {
    const existUser = await this.findUserByUUID(uuid);
    if (existUser === null)
      throw new HttpException('Usuário não existe', HttpStatus.NOT_FOUND);

    delete existUser.id; // Evitar erro, o id é imutavel

    try {
      return await this.prismaService.user.update({
        where: {
          ...existUser,
        },
        data: {
          ...existUser,
          ...data,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Não foi possivel atualizar os dados do usuário no banco de dados',
      );
    }
  }

  async deleteUser(uuid: string): Promise<boolean> {
    const response = await this.prismaService.user.delete({
      where: {
        uuid,
      },
    });
    if (response) {
      return true;
    }
    return false;
  }

  async findUserByEmail(email: string): Promise<UserObject> {
    return await this.prismaService.user.findFirst({
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
