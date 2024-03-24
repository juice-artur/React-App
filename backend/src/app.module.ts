import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { TasksModule } from './tasks/tasks.module';
import { TaskColumnsModule } from './task-columns/task-columns.module';




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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }