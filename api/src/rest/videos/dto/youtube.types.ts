export interface YoutubeVideoFormat {
  itag: number;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  initRange: {
    start: string;
    end: string;
  };
  indexRange: {
    start: string;
    end: string;
  };
  lastModified: string;
  contentLength: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  averageBitrate: number;
  approxDurationMs: string;
  url: string;
}

export enum ProvidersSuport {
  YOUTUBE = 'youtube',
}

export enum VideoQuality {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HD = 'hd720',
  FULLHD = 'hd1080',
  FULLHDPLUS = 'hd1440',
  '4K' = 'hd2160',
  MAX = 'highres',
}

export interface ThumbnailsData {
  url: string;
  width: number;
  height: number;
}
