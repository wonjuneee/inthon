import { forwardRef, Module } from '@nestjs/common';
import { EggService } from './egg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from './egg.entity';
import { EggController } from './egg.controller';
import { EggUserModule } from 'src/user/user.module';
import { ArtModule } from 'src/art/art.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Egg]),
    forwardRef(() => EggUserModule),
    forwardRef(() => ArtModule),
  ],
  providers: [EggService],
  controllers: [EggController],
  exports: [EggService],
})
export class EggModule {}
