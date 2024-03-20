import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasePkEntity } from './astract/basePk.entity';
import { Channel } from './channel.entity';

@Entity()
export class Article extends BasePkEntity {
  @Column()
  externalGuid: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  contentSnippet: string;

  @Column()
  link: string;

  @Column({ type: 'timestamptz' })
  pubDate: Date;

  @Column()
  creator: string;

  @Column({ nullable: true, type: 'jsonb' })
  media?: {
    type: string;
    url: string;
    height: number;
    width: number;
    credit: string;
  };

  @Column({ nullable: false })
  channelId: number;

  @ManyToOne(() => Channel, (channel) => channel.articles, { nullable: false }) // Specify nullable: false
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
