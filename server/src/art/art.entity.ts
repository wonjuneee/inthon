import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';
import { JoinColumn } from 'typeorm';
import { Image } from 'src/image/image.entity';

@Entity('art')
export class Art extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionIdx: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Egg, (egg) => egg.totalArt)
  @JoinColumn()
  eggs: Egg;

  @OneToMany(() => Egg, (egg) => egg.currArt)
  @JoinColumn()
  currentEgg: Egg;

  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn()
  image: Image;
}
