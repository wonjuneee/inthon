import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import {
  PerformanceGetAllResDto,
  PerformanceGetResDto,
} from './dtos/performance.res.dtos';
import { PerformanceGetReq } from './dtos/performance.req.dtos';

@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  private logger: Logger = new Logger('PerformanceController');
  @Get('get-all')
  async getAll(): Promise<PerformanceGetAllResDto[]> {
    this.logger.log('Get all performance data');
    return await this.performanceService.getAll();
  }

  @Get('get')
  async get(
    @Query() performanceGetReq: PerformanceGetReq
  ): Promise<PerformanceGetResDto> {
    this.logger.log('Get performance data');
    const eventId = performanceGetReq.eventId;
    if (!eventId)
      throw new BadRequestException('eventId가 전송되지 않았습니다.');
    return await this.performanceService.get(eventId);
  }
}
