import {
  IsDate,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
} from 'class-validator';
import { IsValidMedia } from '../validators/media.validator';

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
  @IsJSON()
  @Validate(IsValidMedia)
  media?: {
    type: string;
    url: string;
    height: number;
    width: number;
    credit: string;
  };

  @IsNotEmpty()
  @IsNumber()
  channelId: number;
}
