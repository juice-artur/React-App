import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateTaskDto 
{  
    @AutoMap()
    @PrimaryGeneratedColumn()
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
      
    @ApiProperty({nullable: true })
    columnId: number; 
}
