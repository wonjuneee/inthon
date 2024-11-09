import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Art } from 'src/art/art.entity';

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

  async getEgg(id: number): Promise<Egg> {
    const egg = await this.eggRepository.findOne({ where: { id } });
    return egg;
  }
}
