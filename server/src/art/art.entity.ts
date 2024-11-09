import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany, ManyToOne } from 'typeorm';
import { EggEntity } from 'src/egg/egg.entity';
import { JoinColumn } from 'typeorm';

@Entity('art')
export class ArtEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionIdx: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(()=>EggEntity, egg => egg.totalArt)
  @JoinColumn({name: 'id', referencedColumnName: 'totalArt'})
  eggs: EggEntity;

  @OneToMany(()=>EggEntity, egg => egg.currArt)
  @JoinColumn({name: 'id', referencedColumnName: 'currArt'})
  currentEgg: EggEntity;

}
