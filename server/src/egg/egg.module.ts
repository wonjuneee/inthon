import { forwardRef, Module } from '@nestjs/common';
import { EggService } from './egg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from './egg.entity';
import { EggController } from './egg.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Egg]), forwardRef(() => UserModule)],
  providers: [EggService],
  controllers: [EggController],
  exports: [EggService],
})
export class EggModule {}
