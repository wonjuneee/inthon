import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
      const user: User = this.userRepository.create({ username: username });
      await this.userRepository.save(user);
      const egg: Egg = await this.eggService.createEgg(username);
      await this.userRepository.update({ username }, { currEgg: egg });
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

  async updateCurrEgg(username: string, id: number): Promise<UpdateResult> {
    const egg = await this.eggService.getEgg(id);
    return await this.userRepository.update(
      { username: username },
      { currEgg: egg }
    );
  }
}
