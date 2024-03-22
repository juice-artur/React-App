import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

let connectionOptions: DataSourceOptions = {
  type: "postgres" as "postgres", // It could be mysql, mongo, etc
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "db", 
  synchronize: false, 
  logging: true,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["migrations/*{.ts,.js}"], 
};

export default new DataSource({
  ...connectionOptions,
})