import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { ColumnEntity } from 'src/models/entities/column/columns';
import { TaskEntity } from 'src/models/entities/task/task';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [ TaskEntity, ColumnEntity],
    migrations: ["migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);