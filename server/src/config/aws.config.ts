import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION,
  s3AccessKey: process.env.AWS_S3_ACCESS_KEY,
  s3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
}));
