import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetButterfliesResDto } from './dto/get-butterflies-req.dto';
import { ButterflyDto } from './dto/get-butterflies-req.dto';

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

  async getButterflies(username: string): Promise<ButterflyDto[]> {
    const eggs = await this.eggRepository.find({
      select: ['id', 'color'],
      where: { username: username, step : 3 } as any,
    });

    return eggs.map((egg) => {
      return { id: egg.id, color: egg.color };
    });
  }
}

