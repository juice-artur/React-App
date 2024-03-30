import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Board } from "src/board/entities/board.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "history_of_changes_board"})
export class HistoryOfChangesBoard 
{
    @AutoMap()
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @AutoMap()
    @Column({ type: "text" })
    @ApiProperty()
    description: string;

    @AutoMap()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date;
    
    @AutoMap()
    @ManyToOne(() => Board)
    @JoinColumn({ name: "board_id" })
    @ApiProperty()
    board: Board;
}

