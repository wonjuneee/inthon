import {
  Get,
  Body,
  Logger,
  Controller,
  Param,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { GetArtResDto } from './dto/get-art-req.dto';

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}

  private logger: Logger = new Logger('ArtController');

  @Get('get-art')
  async getArt(@Param('id') id: number): Promise<GetArtResDto> {
    this.logger.log('Get art data');
    if (!id) throw new BadRequestException('id가 전송되지 않았습니다.');
    return this.artService.getArt(id);
  }
}
