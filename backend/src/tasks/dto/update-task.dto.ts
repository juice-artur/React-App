import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateTaskDto extends PartialType(CreateTaskDto)
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
