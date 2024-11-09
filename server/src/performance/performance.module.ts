import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performance } from './performance.entity';
import { PerformanceController } from './performance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  providers: [PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
