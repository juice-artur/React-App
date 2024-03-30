import { AutoMap } from "@automapper/classes";
import { TaskColumn } from "../../task-columns/entities/task-column.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Priority } from "../enums/priority.enum";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "task"})
export class Task {
  
  @AutoMap()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  title: string;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @AutoMap()
  @Column('float', { nullable: true })
  @ApiProperty()
  position: number;


  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date;

  @AutoMap()
  @Column({ type: 'enum', enum: Priority, default: Priority.LOW }) 
  @ApiProperty()
  priority: Priority;


  @ManyToOne(() => TaskColumn, taskColumn => taskColumn.task, { cascade: false }) 
  @JoinColumn({name: 'column_id'})
  @ApiProperty()
  column: TaskColumn;
}