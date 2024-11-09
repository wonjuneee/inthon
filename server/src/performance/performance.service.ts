import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Performance } from './performance.entity';
import { PerformanceGetAllResDto } from './dtos/performance.dtos';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>
  ) {}

  async getAll(): Promise<PerformanceGetAllResDto[]> {
    const today = new Date();
    console.log(today);
    return this.performanceRepository.find({
      select: ['eventId', 'prfNm', 'poster'],
      where: {
        prfEnd: MoreThanOrEqual(today),
        prfStart: LessThanOrEqual(today),
      },
      take: 6,
    });
  }
}
