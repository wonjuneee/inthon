import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performance } from './performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  providers: [PerformanceService],
})
export class PerformanceModule {}
