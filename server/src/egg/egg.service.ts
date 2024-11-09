import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { GetEggsResDto } from './dtos/egg.res.dtos';
import { GetButterfliesResDto } from './dto/get-butterflies-req.dto';
import { ButterflyDto } from './dto/get-butterflies-req.dto';

@Injectable()
export class EggService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async createEgg(username: string): Promise<Egg> {
    const user = await this.userService.getUser(username);
    const egg = this.eggRepository.create({ user: user });
    await this.eggRepository.save(egg);
    return egg;
  }

  async getEgg(id: number): Promise<Egg> {
    const egg = await this.eggRepository.findOne({ where: { id } });
    return egg;
  }

  async getEggs(username: string): Promise<any> {
    const user = await this.userService.getUser(username);
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
}
