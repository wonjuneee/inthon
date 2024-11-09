import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ArtEntity } from 'src/art/art.entity';  
import { OneToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';



@Entity('Egg')

export class EggEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @Column()
  color: number;

  @Column()
  currArt: number;

  @Column()
  totalArt: number[];

  @OneToMany(()=>ArtEntity, art => art.id)
  @JoinColumn({name: 'totalArt', referencedColumnName: 'id'})
  art: ArtEntity;

  @ManyToOne(()=>ArtEntity, art => art.id)
  @JoinColumn({name: 'currArt', referencedColumnName: 'id'})
  currentArt: ArtEntity;

  @OneToOne(()=>UserEntity, user=>user.currEgg)
  @JoinColumn({name: 'id', referencedColumnName: 'currEgg'})
  user: UserEntity;

  @ManyToOne(()=>UserEntity, user => user.contains)
  @JoinColumn({name: 'id', referencedColumnName: 'contains'}) 
  users: UserEntity;

}
