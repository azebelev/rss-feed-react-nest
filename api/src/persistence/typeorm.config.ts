import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/persistence/entities/user.entity';
import { DataSource } from 'typeorm';
import { Article } from './entities/article.entity';
import { Channel } from './entities/channel.entity';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('PG_DB_CONNECTION_STRING'),
  entities: [User, Article, Channel],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
