import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  contentSnippet: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsDate()
  pubDate: Date;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsOptional()
  @IsString()
  mediaType: string;

  @IsOptional()
  @IsString()
  mediaUrl: string;

  @IsOptional()
  @IsString()
  mediaCredit: string;

  @IsNotEmpty()
  @IsNumber()
  channelId: number;
}
