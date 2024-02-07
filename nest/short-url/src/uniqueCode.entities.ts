import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UniqueCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '压缩码', length: 10 })
  code: string;

  @Column({ comment: '状态' })
  state: string;
}
