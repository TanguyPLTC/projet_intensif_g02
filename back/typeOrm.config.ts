import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

['.env', 'db.env'].forEach((env) =>
  dotenv.config({
    path: env,
  }),
);

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [process.env.TYPEORM_ENTITIES],
  synchronize: process.env.TYPEORM_AUTO_SCHEMA_SYNC === 'true',
  migrationsTableName: 'migrations', // this field will be used to create the table by name of migrations. You can name it whatever you want. But make sure to use the sensible name
  migrations: [
    process.env.TYPEORM_MIGRATIONS, // This is the path to the migration files created by typeorm cli. You don't have to create dist folder. When you save file, compiled files will be stored in dist folder
  ],
});
