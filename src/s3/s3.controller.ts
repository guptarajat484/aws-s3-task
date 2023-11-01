import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-object/:bucket/:key')
  getObject(@Param() params) {
    return this.s3Service.getObject(params);
  }

  @HttpCode(HttpStatus.OK)
  @Put('put-object/:bucket/:key')
  putObject(@Param() params, @Body() data) {
    return this.s3Service.putObject(params, data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete-object/:bucket/:key')
  deleteObject(@Param() params) {
    return this.s3Service.deleteObject(params);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list-objects/:bucketName')
  listObjects(@Param() params) {
    return this.s3Service.listObjects(params);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list-buckets')
  listBuckets() {
    return this.s3Service.listBuckets();
  }
}
