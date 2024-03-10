import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UploadModule } from './rest/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersResolver } from './graphql/users/users.resolver';
import { PrismaModules } from './prisma/prisma.modules';
@Module({
  imports: [
    UploadModule,
    PrismaModules,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [UsersResolver],
})
export class AppModule {}
