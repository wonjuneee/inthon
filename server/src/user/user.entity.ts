import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { Egg } from 'src/egg/egg.entity';
import { OneToMany } from 'typeorm';
import { type } from 'os';
@Entity('user')
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  currEgg: number;

  @Column()
  contains: number[];

  @OneToOne(() => Egg)
  @JoinColumn()
  currentEgg: Egg;

  @OneToMany(() => Egg, (egg) => egg.id)
  @JoinColumn()
  eggs: Egg[];
}
