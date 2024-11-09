import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class CommonEntity extends BaseEntity {
  @CreateDateColumn({ type: 'time without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time without time zone', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'time without time zone', nullable: true })
  deletedAt: Date;
}
