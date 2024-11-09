import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger('AuthService');
  private readonly users = [
    {
      userId: '1',
      username: 'john',
      password: 'pw1',
    },
    {
      userId: '2',
      username: 'chris',
      password: 'pw2',
    },
  ];

  async validateUser(userId: string, password: string): Promise<any> {
    this.logger.log(`${userId} ${password}`);
    const user = this.users.find((user) => user.userId === userId);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(userId: string, password: string) {
    this.logger.log('Register request');
    return userId;
  }

  async login(user: any) {
    this.logger.log('Login request');
    return user;
  }
}
