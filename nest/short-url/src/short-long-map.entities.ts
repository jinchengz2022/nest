import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class ShortLongMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '压缩码' })
  code: string;

  @Column({ comment: '原始码' })
  initCode: string;

  @CreateDateColumn()
  createTime: Date;
}
