import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto 
{  
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
    updated_at: Date;
  
    
    @ApiProperty({nullable: true })
    columnId: number; 
}
