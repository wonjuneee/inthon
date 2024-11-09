import {
  Controller,
  Body,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserLoginReqDto } from './dto/user.req.dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() userLoginReqDto: UserLoginReqDto): Promise<User> {
    const { username } = userLoginReqDto;
    return await this.userService.login(username);
  }

  @Patch('update-curr-egg/:username/:id')
  async updateCurrEgg(
    @Param('username') username: string,
    @Param('id') id: number
  ): Promise<Object> {
    if (username === undefined || id === undefined)
      throw new BadRequestException('username 또는 id가 전송되지 않았습니다.');
    await this.userService.updateCurrEgg(username, id);
    return { message: '성공적으로 업데이트 되었습니다.' };
  }
}
