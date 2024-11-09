import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { EggService } from './egg.service';
import { GetButterfliesResDto } from './dto/get-butterflies-req.dto';

@Controller('egg')
export class EggController {
  constructor(private eggService: EggService) {}

  private readonly logger: Logger = new Logger(EggController.name);

  @Get('get-eggs/:username')
  async getEggs(@Param('username') username: string) {
    if (username === undefined)
      throw new BadRequestException('username이 전송되지 않았습니다.');
    return await this.eggService.getEggs(username);
  }

  @Get('get-butterflies/:username')
  async getButterflies(
    @Param('username') username: string
  ): Promise<GetButterfliesResDto> {
    this.logger.log('Get butterflies data');
    if (!username)
      throw new BadRequestException('username이 전송되지 않았습니다.');
    const butterflies = await this.eggService.getButterflies(username);
    return { eggs: butterflies };
  }
}
