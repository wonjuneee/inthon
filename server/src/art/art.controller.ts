import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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

  @Post('send-detection')
  async sendPostRequest(@Body() data: any): Promise<any> {
    try {
      // FastAPI 서버의 주소
      const url = 'http://object-detection:8000/detect';

      // 전달할 데이터 준비
      // const imagePath =
      //   'https://inthon7.s3.ap-northeast-2.amazonaws.com/images/2024-Formula1-McLaren-MCL38-002-1600.jpg';
      // const keyword = 'car';

      // FastAPI 서버에 POST 요청 보내기
      const response = await axios.post(
        url,
        {
          imagePath: data.imagePath,
          labels: data.keyword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // FastAPI의 응답에서 score 값 추출
      const score = response.data[0]; // 응답 구조에 맞게 적절히 변경

      // score에 따른 조건 처리
      if (score && score >= 0.9) {
        return { message: 'correct!' };
      } else {
        return { message: 'not correct' };
      }
    } catch (error) {
      console.error('Error sending request to FastAPI:', error);

      // FastAPI와의 통신 문제나 기타 예외 처리
      if (error.response) {
        // FastAPI에서 반환된 오류가 있을 경우 이를 사용
        throw new HttpException(
          error.response.data?.message || 'FastAPI returned an error',
          error.response.status || HttpStatus.BAD_GATEWAY
        );
      } else {
        // 네트워크나 기타 문제로 FastAPI에 도달하지 못한 경우
        throw new HttpException(
          'Failed to communicate with the external server',
          HttpStatus.BAD_GATEWAY
        );
      }
    }
  }
}
