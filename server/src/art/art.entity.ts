import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';

@Entity('Art')
export class Art extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [0, 1, 2, 3, 4, 5, 6], // 6: special question
    default: 0,
  })
  questionIdx: number;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Egg, (egg) => egg.art)
  egg: Egg;

  @OneToOne(() => Egg, (egg) => egg.currArt)
  currEgg: Egg;
}
