import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { TasksModule } from './tasks/tasks.module';
import { TaskColumnsModule } from './task-columns/task-columns.module';
import { HistoryOfChangesBoardModule } from './history-of-changes-board/history-of-changes-board.module';
import { HistoryOfChangesTaskModule } from './history-of-changes-task/history-of-changes-task.module';




@Module({
  imports: [
    TasksModule,
    TaskColumnsModule,
    AutomapperModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    HistoryOfChangesBoardModule,
    HistoryOfChangesTaskModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }