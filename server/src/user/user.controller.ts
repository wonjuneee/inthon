import { Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() body: LoginReqDto): Promise<User> {
    return this.userService.login(body);
  }
}
