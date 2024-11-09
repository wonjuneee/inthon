import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';
import { JoinColumn } from 'typeorm';

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
}
