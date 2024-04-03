import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'video',
    }),
  ],
})
export class VideoModule {}
