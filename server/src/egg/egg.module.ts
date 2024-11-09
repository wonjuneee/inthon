import { Module } from '@nestjs/common';
import { EggService } from './egg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from './egg.entity';
import { EggController } from './egg.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Egg])],
  providers: [EggService],
  controllers: [EggController],
  exports: [EggService],
})
export class EggModule {}
