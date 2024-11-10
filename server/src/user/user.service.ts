import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EggService } from 'src/egg/egg.service';
import { Egg } from 'src/egg/egg.entity';

@Injectable()
export class EggUserService {
  constructor(
    @InjectRepository(Egg)
    private eggRepository: Repository<Egg> // Egg Repository 주입,
  ) {}

  // 로그인 또는 사용자 생성
  async login(username: string): Promise<Egg> {
    // username으로 Egg 조회
    let egg = await this.eggRepository.findOne({
      where: { username: username },
    });

    // Egg가 없으면 새로 생성
    if (!egg) {
      const maxId =
        (await this.eggRepository.find({
          select: ['id'],
          order: { id: 'DESC' },
          take: 1,
        })[0]) | 0;
      console.log(maxId);
      egg = this.eggRepository.create({
        username: username,
        id: maxId + 1, // id는 가장 큰 id + 1
        idx: 0, // 초기값 설정
        step: 0, // 초기값 설정
        color: 0, // 초기값 설정
        isCuurent: true, // 현재 사용자
      });
      await this.eggRepository.save(egg);
    }

    return egg;
  }

  // username으로 Egg 조회
  async getUser(username: string): Promise<Egg> {
    const egg = await this.eggRepository.findOne({
      where: { username: username },
    });
    if (!egg) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }
    return egg;
  }

  // 현재 사용자의 currArt 업데이트
  // async updateCurrArt(
  //   username: string,
  //   currArtId: number
  // ): Promise<UpdateResult> {
  //   // currArt를 업데이트
  //   return await this.eggRepository.update(
  //     { username: username },
  //     { currArt: currArtId }
  //   );
  // }

  async updateCurrEgg(username: string, id: number, idx: number): Promise<Egg> {
    const egg = this.eggRepository.create({
      username: username,
      id: id,
      idx: idx + 1,
    });
    return await this.eggRepository.save(egg);
  }

  // 새로운 Egg 생성 (테스트 용도)
  async createEgg(username: string): Promise<Egg> {
    const egg = this.eggRepository.create({
      username: username,
      step: 0,
      color: 0,
    });
    return await this.eggRepository.save(egg);
  }
}
