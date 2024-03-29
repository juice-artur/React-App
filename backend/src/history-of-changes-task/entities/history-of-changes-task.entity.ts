import { ApiProperty } from "@nestjs/swagger";
import { Task } from "../../tasks/entities/task.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity({name : "history_of_changes_task"})
export class HistoryOfChangesTask
{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ type: "text" })
    @ApiProperty()
    description: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date;

    @ManyToOne(() => Task)
    @JoinColumn({ name: "task_id" })
    @ApiProperty()
    task: Task;
}
