import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/persistence/entities/article.entity';
import { RssSyncService } from 'src/services/rss/rss-sync.service';
import { Channel } from './entities/channel.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Article,Channel])],
  controllers: [ChannelController],
  providers: [ChannelService, RssSyncService],
})
export class ChannelModule {}
