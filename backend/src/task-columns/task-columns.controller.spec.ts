import { Test, TestingModule } from '@nestjs/testing';
import { TaskColumnsController } from './task-columns.controller';
import { TaskColumnsService } from './task-columns.service';

describe('TaskColumnsController', () => {
  let controller: TaskColumnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskColumnsController],
      providers: [TaskColumnsService],
    }).compile();

    controller = module.get<TaskColumnsController>(TaskColumnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
