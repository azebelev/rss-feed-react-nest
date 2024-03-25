import { Column, Entity, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { BasePkEntity } from './astract/basePk.entity';

@Entity()
export class Channel extends BasePkEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'jsonb' })
  image: { url: string; title: string };

  @Column({ type: 'timestamptz' })
  pubDate: Date;

  @Column()
  externalLastUpdate: Date;

  @Column({ unique: true })
  feedUrl: string;

  @OneToMany(() => Article, (article) => article.channel, { cascade: true })
  articles: Article[];
}
