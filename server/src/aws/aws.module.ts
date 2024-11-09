import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import awsConfig from 'src/config/aws.config';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
})
export class AwsModule {}
