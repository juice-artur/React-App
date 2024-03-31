import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn, Column } from "typeorm";

export class CreateBoardDto 
{
    @AutoMap()
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
  
    @AutoMap()
    @Column()
    @ApiProperty()
    title: string;
}
