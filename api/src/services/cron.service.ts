import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/persistence/entities/channel.entity';
import { RssSyncService } from 'src/services/rss/rss-sync.service';
import { wait } from 'src/utils/wait';
import { Repository } from 'typeorm';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepo: Repository<Channel>,
    private rssSyncService: RssSyncService
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async syncRssData() {
    const existingChannels = await this.channelRepo.find();
    await Promise.all(
      existingChannels.map(async (channel) => {
        await this.rssSyncService.sync(channel.feedUrl);
        await wait(5000);
      }),
    );
  }
}
//this.configService.get('NY_TIMES_RSS_HOME_PAGE_URL')
