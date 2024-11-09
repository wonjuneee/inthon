import { JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Image } from 'src/image/image.entity';

export class Art extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => Image, (image) => image.art)
  @JoinColumn()
  image: Image;
}
