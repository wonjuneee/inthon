import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { GetArtResDto } from './dto/get-art-req.dto';
import { GetTotalArtResDto } from './dto/get-total-art.res.dto';
import axios from 'axios';

@Controller('art')
export class ArtController {
  constructor(private artService: ArtService) {}
  private logger: Logger = new Logger('ArtController');

  @Get('get-total-art/:id/:idx')
  async getTotalArt(
    @Param('id') id: number,
    @Param('idx') idx: number
  ): Promise<GetTotalArtResDto[]> {
    this.logger.log('Get total art data');
    if (id === undefined || idx === undefined)
      throw new BadRequestException('id 또는 idx가 전송되지 않았습니다.');
    return await this.artService.getTotalArt(id, idx);
  }

  @Get('get-art')
  async getArt(@Param('id') id: number): Promise<GetArtResDto> {
    this.logger.log('Get art data');
    if (!id) throw new BadRequestException('id가 전송되지 않았습니다.');
    return this.artService.getArt(id);
  }
}
