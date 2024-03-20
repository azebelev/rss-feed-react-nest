import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RssSyncService } from 'src/services/rss/rss-sync.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelsRepo: Repository<Channel>,
    private readonly rssSyncService: RssSyncService,
  ) {}

  async create(createChannelDto: CreateChannelDto) {
    const chanel = this.channelsRepo.findOne({
      where: { feedUrl: createChannelDto.feedUrl },
    });
    if (chanel) throw new Error('channel already exists');
    return await this.rssSyncService.sync(createChannelDto.feedUrl);
  }

  findAll() {
    return this.channelsRepo.find();
  }

  remove(id: number) {
    return this.channelsRepo.delete(id);
  }
}
