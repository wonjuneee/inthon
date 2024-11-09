import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Egg } from 'src/egg/egg.entity';

@Entity('user')
export class User extends CommonEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  username: string;

  @OneToOne(() => Egg, (egg) => egg.id)
  @JoinColumn({ name: 'currEgg' })
  currEgg: Egg;

  @OneToMany(() => Egg, (egg) => egg.id)
  @JoinColumn({ name: 'contains' })
  contains: Egg[];
}
