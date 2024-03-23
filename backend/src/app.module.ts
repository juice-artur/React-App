import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AutomapperModule } from '@automapper/nestjs';
import { pojos} from '@automapper/pojos';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { TaskColumnsModule } from './task-columns/task-columns.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([Task]), 
    AutomapperModule.forRoot(
      [
          {
              name: 'pojos',
              strategyInitializer: pojos(),
          },
      ],
      {

      }
  ), TasksModule, TaskColumnsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}