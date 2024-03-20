import { ConfigService } from '@nestjs/config';
import { Article } from 'src/persistence/entities/article.entity';
import { Channel } from 'src/persistence/entities/channel.entity';
import { User } from 'src/persistence/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getDbConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => ({
  type: 'postgres',
  url: configService.get('PG_DB_CONNECTION_STRING'),
  entities: [User, Article,Channel],
  logging: configService.get('NODE_ENV') === 'DEV',
  migrations: [`${__dirname}/../persistence/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
});
