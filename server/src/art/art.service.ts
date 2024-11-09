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

  async getTotalArt(id: number): Promise<GetTotalArtResDto[]> {
    const egg = await this.eggService.getEgg(id);
    const arts: Array<Art> = egg.totalArt;
    if (arts === undefined) return [];
    const getToTalArtResDto: GetTotalArtResDto[] = arts.map((art) => {
      return {
        id: art.id,
        imagePath: art.imagePath,
      };
    });
    return getToTalArtResDto;
  }
}
