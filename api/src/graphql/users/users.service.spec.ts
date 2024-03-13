import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';

const users: User[] = [
  {
    id: 1,
    uuid: '4b280b63-9ddd-472e-a616-8839e00596b4',
    email: 'test@gmail.com',
    name: 'Ashu11a',
    username: 'Matheus',
    password: 'CafeComl3ite',
  },
];

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(users[0]),
    update: jest.fn().mockReturnValue(users[0]),
    delete: jest.fn().mockReturnValue(users),
    findMany: jest.fn().mockReturnValue(users),
    findFirst: jest.fn().mockReturnValue(users[0]),
    findUnique: jest.fn().mockReturnValue(users[0]),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersResolver,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  it('Should be Defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it(`should return an array of users`, async () => {
      const response = await service.findAllUsers();

      expect(response).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user.findMany).toHaveBeenCalledWith();
    });
  });

  describe('createUser', () => {
    // it('Create user test', async () => {
    //   const data = {
    //     ...users[0],
    //     email: 'Test2@gmail.com',
    //   };
    //   console.log(data);
    //   const response = await service.createUser(data);

    //   expect(response).toBe(users[0]);
    //   expect(prisma.user.create).toHaveBeenCalledTimes(1);
    //   expect(prisma.user.create).toHaveBeenCalledWith({
    //     data: users[0],
    //   });
    // });
    it('return HttpException with CONFLICT if user exist', async () => {
      jest
        .spyOn(prisma.user, 'create')
        .mockRejectedValue(
          new HttpException('Usuário já existe', HttpStatus.CONFLICT),
        );
      try {
        await service.createUser(users[0]);
      } catch (error) {
        expect(error).toEqual(
          new HttpException('Usuário já existe', HttpStatus.CONFLICT),
        );
      }
    });
  });

  describe('updateUser', () => {
    it('Update User test', async () => {
      const response = await service.updateUser(users[0].uuid, users[0]);
      expect(response).toEqual(users[0]);
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { ...users[0] },
        data: users[0],
      });
    });
  });

  describe('findUserByUUID', () => {
    it('Find User by UUID', async () => {
      const response = await service.findUserByUUID(users[0].uuid);
      expect(response).toEqual(users[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          uuid: users[0].uuid,
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('Delete User test', async () => {
      const response = await service.deleteUser(users[0].uuid);
      expect(response).toEqual(true);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
