import { Expose } from 'class-transformer';

export class ChannelResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  feedUrl: string;
}
