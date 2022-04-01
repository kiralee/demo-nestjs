import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  password: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToOne(() => Post, (post) => post.user)
  posts: Post[];
}
