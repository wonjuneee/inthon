import { CommonEntity } from 'src/common/common.entity';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  Check,
  PrimaryColumn,
} from 'typeorm';
import { Art } from 'src/art/art.entity';

@Entity('Egg')
@Check('"step" >= 0 AND "step" <= 3')
@Check('"idx" >= 0 AND "idx" <= 6')
export class Egg extends CommonEntity {
  constructor() {
    super();
    this.color = Math.floor(Math.random() * 4);
  }
  @PrimaryColumn({ type: 'varchar', length: 15 })
  username: string;

  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  idx: number;

  @Column({
    type: 'int',
    default: 0,
  })
  step: number;

  @Column()
  color: number;

  @Column({ type: 'boolean', default: false })
  isCuurent: boolean;

  @OneToOne(() => Art, (art) => art.egg)
  @JoinColumn({ name: 'art' })
  currArt: Art;

  @OneToMany(() => Art, (art) => art.egg)
  art: Art[];
}
