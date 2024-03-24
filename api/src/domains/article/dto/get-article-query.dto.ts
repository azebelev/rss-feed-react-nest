import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { SortingEnum } from 'src/enums/sortingEnum';

export class GetArticleQueryDto {
  @IsInt()
  @IsPositive()
  page: number;

  @IsInt()
  @IsPositive()
  pageSize: number;

  @IsString()
  search: string;

  @IsEnum(SortingEnum)
  pubDateSorting: SortingEnum;
}
