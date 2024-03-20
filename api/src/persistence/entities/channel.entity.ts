import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BasePkEntity } from './astract/basePk.entity';
import { Article } from './article.entity'; 

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

    @OneToMany(() => Article, article => article.channel,{cascade: true})
    articles: Article[]; 
}
