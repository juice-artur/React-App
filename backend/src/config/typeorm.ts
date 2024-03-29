import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';


import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from '../tasks/entities/task.entity';
import { TaskColumn } from '../task-columns/entities/task-column.entity';
import { HistoryOfChangesBoardModule } from '../history-of-changes-board/history-of-changes-board.module';
import { HistoryOfChangesTaskModule } from '../history-of-changes-task/history-of-changes-task.module';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [Task, TaskColumn, HistoryOfChangesBoardModule, HistoryOfChangesTaskModule],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations"
    
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);