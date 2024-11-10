import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Art } from './art.entity';
import { EggService } from 'src/egg/egg.service';
import { GetTotalArtResDto } from './dto/get-total-art.res.dto';
import { Egg } from 'src/egg/egg.entity';

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art) private artRepository: Repository<Art>,
    private eggService: EggService
  ) {}

  async getTotalArt(id: number, idx: number): Promise<GetTotalArtResDto[]> {
    const egg = await this.eggService.getEgg(id, idx);
    const arts: GetTotalArtResDto[] = await this.artRepository.find({
      select: ['id', 'imagePath'],
      where: { egg: egg },
    });
    return arts;
  }

  async getArt(id: number): Promise<Art[]> {
    return this.artRepository.find({
      select: [
        'id',
        'questionIdx',
        'imagePath',
        'description',
        'createdAt',
        'updatedAt',
      ],
      where: { id },
    });
  }

  async getArtByEggId(egg: Egg): Promise<Art[]> {
    const art = await this.artRepository.find({
      select: ['id', 'questionIdx'],
      where: { egg: egg },
    });

    return art;
  }
}
