import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from './item/item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmModuleOptions } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getTypeOrmModuleOptions(),
      }),
    }),
    // TypeOrmModule.forRoot({
    // type: 'postgres',
    // host: process.env.DATABASE_HOST,
    // port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DB,
    // entities: ['dist/**/*.entity{.ts,.js}'],
    // migrations: ['src/migration/*{.ts,.js}'],
    // cli: {
    //   migrationsDir: 'src/migration',
    // },
    // synchronize: true,
    // }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
