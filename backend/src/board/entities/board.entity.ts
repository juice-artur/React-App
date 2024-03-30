import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { TaskColumn } from "src/task-columns/entities/task-column.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Board 
{
    @AutoMap()
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
  
    @AutoMap()
    @Column()
    @ApiProperty()
    title: string;
  
    @AutoMap()
    @OneToMany(() => TaskColumn, column => column.task, {cascade: true})
    @ApiProperty()
    column: TaskColumn[];
}
