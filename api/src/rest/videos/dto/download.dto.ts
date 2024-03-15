import { IsEnum, IsUrl } from 'class-validator';
import { VideoFormatQuality } from 'ytdl-core';
import { ProvidersSuport, VideoQuality } from './youtube.types';

export class DownloadDTO {
  @IsEnum(ProvidersSuport)
  provider: 'youtube';

  @IsUrl()
  url: string;

  @IsEnum(VideoQuality)
  quality: VideoFormatQuality;
}
