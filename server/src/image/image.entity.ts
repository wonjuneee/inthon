import { Column, JoinTable, OneToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Art } from 'src/art/art.entity';

export class Image extends CommonEntity {
  @OneToOne(() => Art, (art) => art.id, {
    cascade: true,
  })
  @JoinTable()
  id: Art;

  @Column({ type: 'varchar', length: 255 })
  imagePath: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;
}
