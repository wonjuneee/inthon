import { Controller, Get, Logger } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceGetAllResDto } from './dtos/performance.dtos';

@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  private logger: Logger = new Logger('PerformanceController');
  @Get('get-all')
  async getAll(): Promise<PerformanceGetAllResDto[]> {
    this.logger.log('Get all performance data');
    return this.performanceService.getAll();
  }
}
