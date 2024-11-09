import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { LoginReqDto } from './dto/login-req.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async login(data: LoginReqDto): Promise<User> {

    return this.userRepository.login(data);
    
  }
}
