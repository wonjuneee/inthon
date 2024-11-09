import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Egg } from 'src/egg/egg.entity';
import { EggService } from 'src/egg/egg.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eggService: EggService
  ) {}

  async login(username: string): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      const egg: Egg = await this.eggService.createEgg();

      await this.userRepository.save(user);
    }

    return user;
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }
    return user;
  }
}
