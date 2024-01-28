import {
  Entity,
  //   CreateDateColumn,
  //   UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @Column()
  userName: string;

  @Column()
  email: string;

  //   @CreateDateColumn()
  //   createTime: Date;

  //   @UpdateDateColumn()
  //   updateTime: Date;

  @PrimaryGeneratedColumn()
  id: number;
}
