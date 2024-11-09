import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { GetTotalArtReq } from './dtos/art.req.dtos';

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}
  private logger: Logger = new Logger('ArtController');

  @Get('get-total-art')
  async getTotalArt(@Query() getTotalArtReq: GetTotalArtReq) {
    this.logger.log('Get total art data');
    const { id } = getTotalArtReq;
    if (id === undefined)
      throw new BadRequestException('id가 전송되지 않았습니다.');
    return await this.artService.getTotalArt(id);
  }
}
