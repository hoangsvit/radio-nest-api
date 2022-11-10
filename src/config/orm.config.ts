import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  const dbOptions = {
    synchronize: false,
    autoLoadEntities: true,
    entities: [__dirname + '/../entities/**/*.entity.{js,ts}'],
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbOptions, {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      break;

    case 'test':
      Object.assign(dbOptions, {
        type: 'sqlite',
        database: 'test.sqlite',
      });
      break;

    case 'production':
      Object.assign(dbOptions, {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      break;

    default:
      throw new Error('unknown environment');
  }

  return dbOptions;
};

export const getDataSourceOptions = (): DataSourceOptions => {
  const options: DataSourceOptions = {
    ...getTypeOrmModuleOptions(),
  } as DataSourceOptions;

  Object.assign(options, {
    migrationsTableName: '__migrations',
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as Partial<DataSourceOptions>);

  return options;
};

export default new DataSource(getDataSourceOptions());
