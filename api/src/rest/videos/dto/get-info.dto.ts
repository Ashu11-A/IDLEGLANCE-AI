import { IsEnum, IsUrl } from 'class-validator';
import { ProvidersSuport } from './youtube.types';

export class GetInfoVideo {
  @IsEnum(ProvidersSuport)
  provider: 'youtube';

  @IsUrl()
  url: string;
}
