import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Parser from 'rss-parser';
import { Article } from 'src/persistence/entities/article.entity';
import { Channel } from 'src/persistence/entities/channel.entity';
import { standardizeFeedUrl } from 'src/utils/standardizeFeedUrl';
import { In, Repository } from 'typeorm';
import { ChanelFeedDto } from './dto/chanel.dto';
import { ArticleInitialCreate, ChanelInitialCreate } from './rss-sync-types';

@Injectable()
export class RssSyncService {
  private readonly parser = new Parser({
    customFields: {
      item: ['media:content', 'media:credit'],
    },
  });
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepo: Repository<Channel>,
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  public async sync(url: string) {
    const parsed = (await this.parser.parseURL(
      url,
    )) as unknown as ChanelFeedDto;
    const channel = this.ejectChanel(parsed);
    const articles = this.ejectArticles(parsed);
    return await this.syncDb(channel, articles);
  }

  private async syncDb(
    chanel: ChanelInitialCreate,
    articles: ArticleInitialCreate[],
  ) {
    const channelFromDb = await this.channelRepo.findOne({
      where: { feedUrl: chanel.feedUrl },
    });
    if (!channelFromDb) {
      const newChannel = this.channelRepo.create(chanel);
      await this.channelRepo.save(newChannel);
      newChannel.articles = articles.map((a) => this.articleRepo.create(a));
      await this.channelRepo.save(newChannel);
      return true;
    } else {
      const guids = articles.map((a) => a.externalGuid);
      const alreadyInDbGuids = (
        await this.articleRepo.find({
          where: { externalGuid: In(guids) },
          select: { externalGuid: true },
        })
      ).map((a) => a.externalGuid);

      const newArticles = this.articleRepo.create(
        articles
          .filter((a) => !alreadyInDbGuids.includes(a.externalGuid))
          .map((a) => ({ ...a, channel: channelFromDb })),
      );
      await this.articleRepo.save(newArticles);
    }
  }

  private ejectChanel(dto: ChanelFeedDto): ChanelInitialCreate {
    return {
      title: dto.title,
      description: dto.description,
      image: {
        url: dto.image.url,
        title: dto.image.title,
      },
      pubDate: new Date(dto.pubDate ? dto.pubDate : dto.lastBuildDate),
      externalLastUpdate: new Date(dto.lastBuildDate),
      feedUrl: standardizeFeedUrl(dto.feedUrl),
    };
  }

  private ejectArticles(dto: ChanelFeedDto): ArticleInitialCreate[] {
    return dto.items.map((i) => ({
      externalGuid: i.guid,
      title: i.title,
      content: i.content,
      contentSnippet: i.contentSnippet,
      link: i.link,
      pubDate: new Date(i.pubDate),
      creator: i['dc:creator'] ?? '',
      mediaType: i['media:content']?.$?.medium,
      mediaUrl: i['media:content']?.$?.url,
      mediaCredit: i['media:credit'],
    }));
  }
}
