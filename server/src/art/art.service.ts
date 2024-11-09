import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Art } from './art.entity';
import { GetTotalArtResDto } from './dtos/art.res.dtos';
import { EggService } from 'src/egg/egg.service';

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art) private artRepository: Repository<Art>,
    private eggService: EggService
  ) {}

  async getTotalArt(id: number): Promise<any> {
    const egg = await this.eggService.getEgg(id);
  }

  async getArt(id: number): Promise<Art> {
    return this.artRepository.findOne({
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
}
