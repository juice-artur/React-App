import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';


import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from '../tasks/entities/task.entity';
import { TaskColumn } from '../task-columns/entities/task-column.entity';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [Task, TaskColumn],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations"
    
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);