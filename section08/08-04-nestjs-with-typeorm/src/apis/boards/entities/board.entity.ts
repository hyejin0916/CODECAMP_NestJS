import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  number: number;

  @Column()
  writer: string;
  @Column()
  title: string;
  @Column()
  contents: string;
}
