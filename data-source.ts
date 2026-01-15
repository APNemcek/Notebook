import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
