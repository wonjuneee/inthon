import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { EggService } from './egg.service';
import { GetButterfliesResDto } from './dto/get-butterflies-req.dto';
import { GetEggsResDto } from './dto/get-eggs-res.dto';
import { GetCurrentEggsResDto } from './dto/get-current-eggs-req.dto';

@Controller('egg')
export class EggController {
  constructor(private eggService: EggService) {}

  private readonly logger: Logger = new Logger(EggController.name);

  @Get('get-eggs/:username')
  async getEggs(@Param('username') username: string): Promise<GetEggsResDto[]> {
    if (username === undefined)
      throw new BadRequestException('username이 전송되지 않았습니다.');
    return await this.eggService.getEggs(username);
  }

  @Get('get-butterflies/:username')
  async getButterflies(
    @Param('username') username: string
  ): Promise<GetButterfliesResDto> {
    this.logger.log('Get butterflies data');
    if (username === undefined)
      throw new BadRequestException('username이 전송되지 않았습니다.');
    const butterflies = await this.eggService.getButterflies(username);
    return { eggs: butterflies };
  }

  @Get('get-current/:username')
  async getCurrentEggs(
    @Param('username') username: string
  ): Promise<GetCurrentEggsResDto> {
    this.logger.log('Get current eggs data');
    if (username === undefined)
      throw new BadRequestException('username이 존재하지 않습니다.');
    const { egg, art } = await this.eggService.getCurrentEggs(username);

    return { egg: egg, art: art };
  }
}
