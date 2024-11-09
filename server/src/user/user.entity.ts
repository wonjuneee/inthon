import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Egg } from 'src/egg/egg.entity';
import { OneToMany } from 'typeorm';

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
