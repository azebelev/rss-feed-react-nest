import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RssSyncService } from './services/rss/rss-sync.service';

@Injectable()
export class AppService {
  constructor(
    private rssSyncService: RssSyncService,
    private configService: ConfigService,
  ) {}
  async getHello() {
    return await this.rssSyncService.sync(
      this.configService.get('NY_TIMES_RSS_HOME_PAGE_URL'),
    );
  }
}
