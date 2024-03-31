import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { TaskColumn } from "src/task-columns/entities/task-column.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";

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

    @OneToMany(() => TaskColumn, column => column.board)
    @ApiProperty()
    column: TaskColumn[];
}
