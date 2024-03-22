import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TaskEntity } from "../task/task";

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => TaskEntity, task => task.column)
  tasks: TaskEntity[];
}