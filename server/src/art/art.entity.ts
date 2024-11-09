import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  Check,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';

@Entity('Art')
@Check('"questionIdx" >= 0 AND "questionIdx" <= 6')
export class Art extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
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
