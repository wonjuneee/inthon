import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { EggService } from './egg.service';

@Controller('egg')
export class EggController {
  constructor(private eggService: EggService) {}

  @Get('get-eggs/:username')
  async getEggs(@Param('username') username: string) {
    if (username === undefined)
      throw new BadRequestException('username이 전송되지 않았습니다.');
    return await this.eggService.getEggs(username);
  }
}
