import { Article } from 'src/persistence/entities/article.entity';
import { BasePkEntity } from 'src/persistence/entities/astract/basePk.entity';
import { Channel } from 'src/persistence/entities/channel.entity';

export type ArticleInitialCreate = Omit<
  Article,
  keyof BasePkEntity | 'channel' | 'channelId'
>;

export type ChanelInitialCreate = Omit<
  Channel,
  keyof BasePkEntity | 'articles'
>;
