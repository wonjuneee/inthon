import { Module } from '@nestjs/common';
import { EggUserService } from './user.service';
import { EggController } from './user.controller';
import { EggModule } from 'src/egg/egg.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from 'src/egg/egg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Egg]), EggModule],
  providers: [EggUserService],
  controllers: [EggController],
  exports: [EggUserService],
})
export class EggUserModule {}
