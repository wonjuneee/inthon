import { Controller, Body } from '@nestjs/common';
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
    return this.userService.login(username);
  }
}
