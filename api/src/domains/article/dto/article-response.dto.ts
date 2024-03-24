import { Expose } from 'class-transformer';

export class ArticleResponseDto {
  @Expose()
  id: number;

  @Expose()
  externalGuid: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  link: string;

  @Expose()
  pubDate: Date;

  @Expose()
  creator: string;

  @Expose()
  mediaType?: string;

  @Expose()
  mediaUrl?: string;

  @Expose()
  mediaCredit?: string;
}
