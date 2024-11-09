import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';

@Entity('user')
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  username: string;

  @OneToOne(() => Egg, (egg) => egg.id)
  @JoinColumn({ name: 'currName' })
  currEgg: Egg;

  @OneToMany(() => Egg, (egg) => egg.id)
  @JoinColumn({ name: 'contains' })
  contains: Egg[];
}
