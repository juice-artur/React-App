import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, mapFrom, MappingConfiguration, type Mapper, extend, forMember } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Task, TaskDto, forMember((dest) => dest.columnId, mapFrom((source) => {
                return source.column.id;
            },
            )),
                forMember(dest => dest.id, mapFrom(src => src.id)),
                forMember(dest => dest.title, mapFrom(src => src.title)),
                forMember(dest => dest.description, mapFrom(src => src.description)),
                forMember(dest => dest.position, mapFrom(src => src.position)),
                forMember(dest => dest.created_at, mapFrom(src => src.created_at)),
                forMember(dest => dest.updated_at, mapFrom(src => src.updated_at))),
                forMember((dest: TaskDto) => dest.priority, mapFrom((src: Task) => src.priority)),
                forMember((dest: TaskDto) => dest.due_date, mapFrom((src: Task) => src.due_date))
        };
    }
}