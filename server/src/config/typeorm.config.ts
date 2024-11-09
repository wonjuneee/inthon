import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dbConfig from './db.config';

export const TypeormConfig = (config: ConfigType<typeof dbConfig>) => {
  
  const option: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [__dirname + '/*/*.entity{.ts,.js}'],
    synchronize: config.env === 'production' ? false : true,
    logging: true,
  };

  return option;

};