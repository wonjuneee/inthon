import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Egg } from './egg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { GetEggsResDto } from './dtos/egg.res.dtos';

@Injectable()
export class EggService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
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

  async getEggs(username: string): Promise<GetEggsResDto[]> {
    const user = await this.userService.getUser(username);
    const eggs: Array<Egg> = user.contains;
    if (eggs === undefined) {
      return [];
    }
    const getEggsReqDto: GetEggsResDto[] = eggs.map((egg) => {
      if (egg.id !== user.currEgg.id && egg.step === 0)
        return {
          id: egg.id,
          color: egg.color,
        };
    });
    return getEggsReqDto;
  }
}
