import { TaskColumn } from "src/task-columns/entities/task-column.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class Task {
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

  @ManyToOne(() => TaskColumn, taskColumn => taskColumn.tasks)
  column: TaskColumn;
}