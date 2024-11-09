import { Column, JoinTable, OneToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Art } from 'src/art/art.entity';

export class Image extends CommonEntity {
  @Column()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  imagePath: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToOne(() => Art, (art) => art.image, {
    cascade: true,
  })
  @JoinTable()
  art: Art;
}
