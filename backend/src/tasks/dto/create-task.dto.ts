import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { Priority } from "../enums/priority.enum";

export class CreateTaskDto 
{  
    @AutoMap()
    @PrimaryGeneratedColumn()
    @ApiProperty({nullable: true })
    id: number;
    
    @AutoMap()
    @ApiProperty({nullable: true })
    title: string;
  
    @AutoMap()
    @ApiProperty({nullable: true })
    description?: string;
  
    @AutoMap()
    @ApiProperty({nullable: true })
    position: number;
  
    @AutoMap()
    @ApiProperty({nullable: true })
    created_at: Date;

    @AutoMap()
    @ApiProperty({nullable: true })
    due_date: Date;
      

    @ApiProperty({nullable: true })
    columnId: number; 

    @AutoMap()
    @ApiProperty({nullable: true })
    priority: Priority;
}
