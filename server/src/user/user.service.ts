import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Egg } from 'src/egg/egg.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login(username: string): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      user = this.userRepository.create({
        username: username,
        currEgg: new Egg(),
        contains: [],
      });

      await this.userRepository.save(user);
    }

    return user;
  }
}
