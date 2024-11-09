import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';

@Entity('Art')
export class Art extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [0, 1, 2, 3, 4, 5, 6], // 6: special question
  })
  questionIdx: number;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Egg, (egg) => egg.totalArt)
  eggs: Egg;

  @OneToOne(() => Egg, (egg) => egg.currArt)
  currEgg: Egg;
}
