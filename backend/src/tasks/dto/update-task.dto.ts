import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { AutoMap } from '@automapper/classes';
import { Priority } from '../enums/priority.enum';

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
    due_date: Date;

    @AutoMap()
    @ApiProperty({nullable: true })
    created_at: Date;
  
  
    @AutoMap()
    @ApiProperty({nullable: true })
    updated_at: Date;
  
    @AutoMap()
    @ApiProperty({nullable: true })
    columnId: number; 

    @AutoMap()
    @ApiProperty({nullable: true })
    priority: Priority;
 }
