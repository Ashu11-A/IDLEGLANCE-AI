import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { writeFileSync } from 'fs';
import { VideoFormatQuality, getInfo, validateURL } from 'ytdl-core';
import { ThumbnailsData, YoutubeVideoFormat } from './dto/youtube.types';

@Injectable()
export class VideosService {
  async downloadYoutube(url: string, quality: VideoFormatQuality) {
    const isValid = validateURL(url);

    try {
      if (isValid) {
        const videoInfo = await getInfo(url);
        console.log(videoInfo);
        const jsonVideoInfo = JSON.stringify(videoInfo, null, 2);
        writeFileSync(
          `public/videos/${videoInfo.videoDetails.videoId}`,
          jsonVideoInfo,
        );

        videoInfo.player_response.streamingData.formats;

        // downloadFromInfo(videoInfo, {
        //   quality,
        // }).pipe(
        //   createWriteStream(`public/videos/${videoInfo.videoDetails.videoId}`),
        // );
      } else {
        throw new HttpException('URL not Valid', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async getInfo(url: string) {
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
