import { CommonEntity } from 'src/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
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

  @Column()
  currArt: number;

  @Column()
  totalArt: number[];

  @OneToMany(()=>Art, art => art.id)
  @JoinColumn()
  art: Art;

  @ManyToOne(()=>Art, art => art.id)
  @JoinColumn()
  currentArt: Art;

  @OneToOne(()=>User, user=>user.currEgg)
  @JoinColumn()
  user: User;

  @ManyToOne(()=>User, user => user.contains)
  @JoinColumn() 
  users: User;

}
