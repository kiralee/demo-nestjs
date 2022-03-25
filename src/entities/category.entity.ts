import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 75 })
  title: string;

  @Column({ nullable: true, length: 100 })
  metaTitle: string;

  @Column({ nullable: false, length: 100 })
  slug: string;

  @Column({ nullable: true })
  content: string;
}
