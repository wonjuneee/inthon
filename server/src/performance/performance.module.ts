import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Module({
  providers: [PerformanceService]
})
export class PerformanceModule {}
