import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class TaskDto {

  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  title: string;

  @AutoMap()
  @ApiProperty({ required: false })
  description?: string;

  @AutoMap()
  @ApiProperty()
  position: number;

  @AutoMap()
  @ApiProperty()
  created_at: Date;


  @AutoMap()
  @ApiProperty()
  updated_at: Date;

  
  @ApiProperty()
  columnId: number; 
}