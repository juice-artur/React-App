import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';


import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from 'src/tasks/entities/task.entity';
import { TaskColumn } from 'src/task-columns/entities/task-column.entity';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [Task, TaskColumn],
    migrations: ["../migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    migrationsRun: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);