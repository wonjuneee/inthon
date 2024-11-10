import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ButterflyDto } from './dto/get-butterflies-req.dto';
import { GetEggsResDto } from './dto/get-eggs-res.dto';
import { CurrentArtDto, CurrentEggDto } from './dto/get-current-eggs-req.dto';
import { ArtService } from 'src/art/art.service';

@Injectable()
export class EggService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg>,
    @Inject(forwardRef(() => ArtService))
    private artService: ArtService
  ) {}

  async getEgg(id: number, idx: number): Promise<Egg> {
    const egg = await this.eggRepository.findOne({
      where: { id: id, idx: idx },
    });
    return egg;
  }

  async getEggs(username: string): Promise<GetEggsResDto[]> {
    const eggs: GetEggsResDto[] = await this.eggRepository.find({
      select: ['id', 'color'],
      where: { username: username, step: 0, isCurrent: false } as any,
    });

    return eggs;
  }

  async getButterflies(username: string): Promise<ButterflyDto[]> {
    const eggs = await this.eggRepository.find({
      select: ['id', 'color'],
      where: { username: username, step: 3 } as any,
    });

    return eggs.map((egg) => {
      return { id: egg.id, color: egg.color };
    });
  }

  async getCurrentEggs(
    username: string
  ): Promise<{ egg: CurrentEggDto; art: CurrentArtDto[] }> {
    const egg = await this.eggRepository.find({
      order: { idx: 'DESC' },
      where: { username: username, isCuurent: true },
      take: 1,
    });

    const eggDto: CurrentEggDto = {
      id: egg[0].id,
      step: egg[0].step,
      color: egg[0].color,
    };

    const artDto: CurrentArtDto[] = await this.artService.getArtByEggId(egg[0]);

    return { egg: eggDto, art: artDto };
  }

  async getEggByUser(username: string): Promise<Egg> {
    return await this.eggRepository.findOne({ where: { username: username } });
  }
}
