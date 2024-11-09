import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Art } from 'src/art/art.entity';
import { User } from 'src/user/user.entity';

@Entity('Egg')
export class Egg extends CommonEntity {
  constructor() {
    super();
    this.color = Math.floor(Math.random() * 4);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [0, 1, 2, 3],
    default: 0,
  })
  step: number;

  @Column()
  color: number;

  @ManyToOne(() => User, (user) => user.username)
  user: User;

  @OneToOne(() => User, (user) => user.currEgg)
  currEgg: User;

  @OneToOne(() => Art, (art) => art.egg)
  @JoinColumn({ name: 'art' })
  currArt: Art;

  @OneToMany(() => Art, (art) => art.egg)
  art: Art[];
}
