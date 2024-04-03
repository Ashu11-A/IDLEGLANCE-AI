import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ThumbnailsData,
  YoutubeVideoFormat,
} from 'src/rest/videos/dto/youtube.types';
import { getInfo, validateURL } from 'ytdl-core';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(
    @InjectQueue('video') private videoQueue: Queue,
    private readonly prismaService: PrismaService,
  ) {}

  async create(url: string) {
    const regex = /[?&]v=([^&#]+)/;
    const videoId = regex.exec(url)[1];

    if (await this.findOne(videoId))
      throw new HttpException(
        '❌ Já existe no Banco de Dados!',
        HttpStatus.CONFLICT,
      );
    const {
      title,
      description,
      category,
      isFamilySafe,
      lengthSeconds,
      publishDate,
    } = await this.getInfo(url);

    const video = this.prismaService.video.create({
      data: {
        title,
        description,
        youtubeId: videoId,
        category,
        isFamilySafe,
        lengthSeconds: Number(lengthSeconds),
        publishDate,
      },
    });
    return video;
  }

  async process(video: any) {
    const job = await this.videoQueue.add({
      foo: 'bar',
    });
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: string) {
    const video = this.prismaService.video.findUnique({
      where: {
        youtubeId: id,
      },
    });
    return video;
  }

  async findOrCreate(id: string) {
    let video: Video = undefined;
    video = await this.findOne(id);
    if (video) return video;

    video = await this.create(`https://www.youtube.com/watch?v=${id}`);
    return video;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }

  private async getInfo(url: string) {
    const isValid = validateURL(url);

    if (isValid) {
      const videoinfo = await getInfo(url);
      const adaptiveFormats = videoinfo.player_response.streamingData
        .adaptiveFormats as YoutubeVideoFormat[];
      const thumbnails = videoinfo.videoDetails.thumbnails as ThumbnailsData[];

      const bestQualityVideo = adaptiveFormats.reduce((best, current) => {
        if (current.mimeType.toLowerCase().startsWith('video/')) {
          return current.width * current.height + current.bitrate >
            (best.width ?? 0) * (best.height ?? 0) + (best.bitrate ?? 0)
            ? current
            : best;
        }
        return best;
      }, adaptiveFormats[0]);

      const bestQualityAudio = adaptiveFormats.reduce((best, current) => {
        if (current.mimeType.toLowerCase().startsWith('audio/')) {
          return current.bitrate + current.averageBitrate >
            (best?.bitrate ?? 0) + (best?.averageBitrate ?? 0)
            ? current
            : best;
        }
      }, adaptiveFormats[0]);
      const bestThumbnail = thumbnails.reduce((best, current) => {
        return current.width + current.height > best.width + best.height
          ? current
          : best;
      });

      return {
        ...videoinfo.videoDetails,
        availableCountries: undefined,
        bestQualityAudio,
        bestQualityVideo,
        bestThumbnail,
        streamingData: [...adaptiveFormats],
      };
    }
    throw new HttpException('URL not Valid', HttpStatus.BAD_REQUEST);
  }
}
