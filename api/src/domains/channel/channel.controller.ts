import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ChannelService } from './channel.service';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @Get()
  async findAll() {
    return plainToInstance(
      ChannelResponseDto,
      await this.channelService.findAll(),
      { excludeExtraneousValues: true },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelService.remove(+id);
  }
}
