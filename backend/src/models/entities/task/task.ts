import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ColumnEntity } from "../column/columns";

@Entity()
export class TaskEntity {
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

  @ManyToOne(() => ColumnEntity, column => column.tasks)
  column: ColumnEntity;
}