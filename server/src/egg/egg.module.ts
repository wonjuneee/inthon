import { Module } from '@nestjs/common';
import { EggService } from './egg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EggEntity } from './egg.entity';
import { EggController } from './egg.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EggEntity])],
  providers: [EggService],
  controllers: [EggController],
})
export class EggModule {}
