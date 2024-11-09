import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginReqDto } from './dto/login-req.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login(logindata: LoginReqDto): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { username: logindata.username },
    });

    if (!user) {
      user = this.userRepository.create({
        username: logindata.username,
        currEgg: 0,
        contains: [],
      });
    }

    await this.userRepository.save(user);
    return user;
  }
}
