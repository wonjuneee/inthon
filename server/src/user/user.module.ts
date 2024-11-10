import { Module } from '@nestjs/common';
import { EggUserService } from './user.service';
import { EggController } from './user.controller';
import { EggModule } from 'src/egg/egg.module';

@Module({
  imports: [EggModule],
  providers: [EggUserService],
  controllers: [EggController],
  exports: [EggUserService],
})
export class UserModule {}
