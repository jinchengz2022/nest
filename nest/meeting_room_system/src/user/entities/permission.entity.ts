import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, comment: '权限码' })
  code: string;

  @Column({ length: 50, comment: '权限描述' })
  description: string;
}
