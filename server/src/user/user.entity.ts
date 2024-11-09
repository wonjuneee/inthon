import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { EggEntity } from 'src/egg/egg.entity';
import { OneToMany } from 'typeorm';
import { type } from 'os';
@Entity('user')

export class UserEntity extends CommonEntity {

  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  currEgg: number;

  @Column()
  contains: number[];

  @OneToOne(()=> EggEntity)
  @JoinColumn({name: 'currEgg', referencedColumnName: 'id'})
  currentEgg: EggEntity;

  @OneToMany(()=> EggEntity, egg => egg.id)
  @JoinColumn({name: 'contains', referencedColumnName: 'id'})
  eggs: EggEntity[];

}
