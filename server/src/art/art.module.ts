import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './art.entity';
import { ArtController } from './art.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Art])],
  providers: [ArtService],
  controllers: [ArtController],
})
export class ArtModule {}
