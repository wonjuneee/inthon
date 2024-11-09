import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './art.entity';
import { ArtController } from './art.controller';
import { EggModule } from 'src/egg/egg.module';

@Module({
  imports: [TypeOrmModule.forFeature([Art]), EggModule],
  providers: [ArtService],
  controllers: [ArtController],
})
export class ArtModule {}
