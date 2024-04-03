import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './graphql/auth/auth.module';
import { UsersModule } from './graphql/users/users.module';
import { PrismaModules } from './prisma/prisma.modules';
import { AudioModule } from './queue/audio/audio.module';
import { ImageModule } from './queue/image/image.module';
import { VideoModule } from './queue/video/video.module';
import { UploadModule } from './rest/upload/upload.module';

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
    VideoModule,
    AudioModule,
    ImageModule,
  ],
})
export class AppModule {}
