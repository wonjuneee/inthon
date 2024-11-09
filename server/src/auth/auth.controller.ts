import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Logger,
  Body,
} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger: Logger = new Logger('AuthController');

  @Public()
  @Post('register')
  async register(@Body() userId: string, @Body() password: string) {
    this.logger.log('Register request');
    return this.authService.register(userId, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log('Login request');
    const userId = await this.authService.login(req.user);
    return userId;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Request() req) {
    req.session.destroy();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('info')
  async getInfo(@Request() req) {
    return req.user;
  }
}
