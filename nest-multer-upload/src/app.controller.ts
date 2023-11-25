import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from '../storage/index';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // npx http-server 监听本地上传文件 后 yarn start:dev

  @Post('aaa')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(body);
    console.log(file);
  }

  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles1(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    console.log(body, '222');
    console.log(file, '222');
  }

  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadFiles2(
    @UploadedFiles(
      new ParseFilePipe({
        exceptionFactory: (err) => {
          throw new HttpException('error' + err, 400);
        },
        validators: [
          // new MaxFileSizeValidator({maxSize: })
          new FileTypeValidator({ fileType: 'jpeg/jpg' }),
        ],
      }),
    )
    file: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(body, '222');
    console.log(file, '222');
  }
}
