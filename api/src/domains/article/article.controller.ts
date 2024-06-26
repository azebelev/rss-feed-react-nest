import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { IntegerValidationPipe } from 'src/validation/integer.validation';
import { ArticleService } from './article.service';
import { ArticleResponseDto } from './dto/article-response.dto';
import { GetArticleQueryDto } from './dto/get-article-query.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('channel/:channelId')
  async findForChannel(
    @Query() query: GetArticleQueryDto,
    @Param('channelId', IntegerValidationPipe) channelId: number,
  ) {
    const data = await this.articleService.findForChannel(query, channelId);
    const pureArticles = plainToInstance(ArticleResponseDto, data[0], {
      excludeExtraneousValues: true,
    });

    return { articles: pureArticles, count: data[1] };
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
