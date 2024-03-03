import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, comment: 'userName ' })
  userName: string;

  @Column({ length: 50, comment: 'password ' })
  password: string;

  @Column({ length: 50, comment: 'nickName ' })
  nickName: string;

  @Column({ length: 50, comment: 'email' })
  email: string;

  @Column({ length: 50, comment: 'headPic', nullable: true })
  headPic: string;

  @Column({ length: 15, comment: 'phone', nullable: true })
  phone: string;

  @Column({ comment: 'isFrozen', default: false })
  isFrozen: boolean;

  @Column({ comment: 'isAdmin', default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
