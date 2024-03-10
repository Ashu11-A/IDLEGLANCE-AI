import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File) {
    const url = this.configService.get('SUPABASE_URL');
    const token = this.configService.get('SUPABASE_TOKEN');

    const supabase = createClient(url, token, {
      auth: {
        persistSession: false,
      },
    });
    const data = await supabase.storage
      .from('thumbnails')
      .upload(`${file.originalname}-${Date.now()}`, file.buffer, {
        upsert: false,
      });
    return data;
  }
}
