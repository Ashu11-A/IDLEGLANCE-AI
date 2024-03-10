import {
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  async UploadThumb(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024, // 1MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return await this.uploadService.upload(file);
    } else {
      throw new HttpException(
        'Only .png and .jpeg files',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
