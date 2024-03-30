import { AutoMap } from "@automapper/classes";
import { Task } from "../../tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Board } from "src/board/entities/board.entity";

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;
  
  @AutoMap()
  @Column('float', { nullable: true })
  @ApiProperty()
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(() => Task, task => task.column)
  @ApiProperty()
  task: Task[];

  @OneToMany(() => Task, task => task.column, { cascade: ['remove'] })
  @JoinColumn({name: 'board_id'})
  @ApiProperty()
  board: Board;
}

