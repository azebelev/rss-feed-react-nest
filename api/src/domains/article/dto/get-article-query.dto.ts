import { IsEnum, IsInt } from 'class-validator';
import { ChannelEnum } from 'src/enums/channelEnum';

export class GetArticleQueryDto {
  @IsInt()
  pageNumber: number;

  @IsInt()
  pageSize: number;

  @IsInt()
  channelId: number;
}
