import { Body, Controller, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { DownloadDTO } from './dto/download.dto';
import { GetInfoVideo } from './dto/get-info.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('download')
  async downloader(@Body() { provider, url, quality }: DownloadDTO) {
    switch (provider) {
      case 'youtube':
        await this.videosService.downloadYoutube(url, quality);
    }
  }

  @Post('info')
  async getInfoVideo(@Body() { provider, url }: GetInfoVideo) {
    switch (provider) {
      case 'youtube':
        return this.videosService.getInfo(url);
    }
  }
}
