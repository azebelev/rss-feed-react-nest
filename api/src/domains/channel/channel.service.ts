import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/persistence/entities/channel.entity';
import { RssSyncService } from 'src/services/rss/rss-sync.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelsRepo: Repository<Channel>,
    private readonly rssSyncService: RssSyncService,
  ) {}

  async create(createChannelDto: CreateChannelDto) {
    const chanel = await this.channelsRepo.findOne({
      where: { feedUrl: createChannelDto.feedUrl },
    });
    if (chanel) throw new ConflictException('Channel already exists');
    return await this.rssSyncService.sync(createChannelDto.feedUrl);
  }

  findAll() {
    return this.channelsRepo.find();
  }

  remove(id: number) {
    return this.channelsRepo.delete(id);
  }
}
