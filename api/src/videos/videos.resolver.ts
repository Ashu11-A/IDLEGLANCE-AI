import { Resolver } from '@nestjs/graphql';
import { VideosService } from './videos.service';

@Resolver()
export class VideosResolver {
  constructor(private readonly videosService: VideosService) {}
}
