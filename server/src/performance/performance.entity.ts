import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

@Entity('Performance')
export class Performance extends CommonEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  eventId: string;

  @Column({ type: 'varchar', length: 127 })
  prfNm: string;

  @Column({ type: 'date' })
  prfStart: Date;

  @Column({ type: 'date' })
  prfEnd: Date;

  @Column({ type: 'varchar', length: 31 })
  placeNm: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  poster: string;

  @Column({ type: 'varchar', length: 31 })
  genre: string;
}
