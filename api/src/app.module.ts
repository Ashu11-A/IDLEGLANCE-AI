import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './graphql/users/users.module';
import { PrismaModules } from './prisma/prisma.modules';
import { UploadModule } from './rest/upload/upload.module';
import { AuthModule } from './graphql/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VideosModule } from './rest/videos/videos.module';

@Module({
  imports: [
    UploadModule,
    PrismaModules,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    VideosModule,
  ],
})
export class AppModule {}
