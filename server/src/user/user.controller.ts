import {
  Controller,
  Body,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { EggUserService } from './user.service';
import { Post } from '@nestjs/common';
import { UserLoginReqDto } from './dto/user.req.dtos';
import { Egg } from 'src/egg/egg.entity';

@Controller('user')
export class EggController {
  constructor(private eggUserService: EggUserService) {}

  @Post('login')
  async login(@Body() userLoginReqDto: UserLoginReqDto): Promise<Egg> {
    const { username } = userLoginReqDto;
    return await this.eggUserService.login(username);
  }

  @Patch('update-curr-egg/:username/:id')
  async updateCurrEgg(
    @Param('username') username: string,
    @Param('id') id: number,
    @Param('idx') idx: number
  ): Promise<any> {
    if (username === undefined || id === undefined || idx === undefined)
      throw new BadRequestException(
        'username 또는 id 또는 idx가 전송되지 않았습니다.'
      );
    await this.eggUserService.updateCurrEgg(username, id, idx);
    return { message: '성공적으로 업데이트 되었습니다.' };
  }
}
