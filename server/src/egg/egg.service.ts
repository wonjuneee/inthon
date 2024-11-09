import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EggService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async createEgg(): Promise<Egg> {
    const egg = this.eggRepository.create();
    await this.eggRepository.save(egg);
    return egg;
  }
}
