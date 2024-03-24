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
  link: string;

  @Column({ type: 'timestamptz' })
  pubDate: Date;

  @Column()
  creator: string;

  @Column({ nullable: true })
  mediaType?: string;

  @Column({ nullable: true })
  mediaUrl?: string;

  @Column({ nullable: true })
  mediaCredit?: string;

  @Column({ nullable: false })
  channelId: number;

  @ManyToOne(() => Channel, (channel) => channel.articles, {
    nullable: false,
    onDelete: 'CASCADE',
  }) // Specify nullable: false
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
