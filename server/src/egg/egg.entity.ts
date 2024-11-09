import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Art } from 'src/art/art.entity';
import { OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('Egg')
export class Egg extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @Column()
  color: number;

  @OneToOne(() => Art, (art) => art.id)
  @JoinColumn({ name: 'currArt' })
  currArt: Art;

  @OneToMany(() => Art, (art) => art.id)
  @JoinColumn({ name: 'totalArt' })
  totalArt: Art[];

  @OneToOne(() => User, (user) => user.currEgg)
  currEgg: User;

  @ManyToOne(() => User, (user) => user.contains)
  contains: User[];
}
