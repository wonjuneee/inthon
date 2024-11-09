import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EggService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg>
  ) {}

  async createEgg(): Promise<Egg> {
    const egg = this.eggRepository.create();
    await this.eggRepository.save(egg);
    return egg;
  }
}
