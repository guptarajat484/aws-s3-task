import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: S3;
  constructor() {
    this.s3 = new S3({
      accessKeyId: 'ACCESS_KEY',
      secretAccessKey: 'SECRET_KEY',
      region: 'S3_REGION',
    });
  }
  async getObject({ bucket, key }) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    try {
      const getObjectOutput = await this.s3.getObject(params);

      return getObjectOutput.createReadStream();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.toString(),
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async putObject({ bucket, object }, data) {
    const params = {
      Body: data,
      Bucket: bucket,
      Key: object,
    };
    try {
      const putObject = await this.s3.putObject(params).promise();
      return putObject;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.toString(),
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async deleteObject({ bucket, object }) {
    const params = {
      Bucket: bucket,
      Key: object,
    };
    try {
      const deleteObject = await this.s3.deleteObject(params).promise();

      return deleteObject;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.toString(),
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async listObjects({ bucket }) {
    const params = {
      Bucket: bucket,
    };
    try {
      const listObjectsOutput = await this.s3.listObjects(params).promise();
      return listObjectsOutput.Contents.map((object) => object.Key);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.toString(),
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async listBuckets() {
    try {
      const listBucketsOutput = await this.s3.listBuckets().promise();
      return listBucketsOutput.Buckets.map((bucket) => bucket.Name);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.toString(),
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
