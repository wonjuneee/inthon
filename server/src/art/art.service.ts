import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Art } from './art.entity';

@Injectable()
export class ArtService {
  constructor(
    @InjectRepository(Art)
    private artRepository: Repository<Art>
  ) {}

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
