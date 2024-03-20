import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/persistence/entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleQueryDto } from './dto/get-article-query.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepo.insert(createArticleDto);
  }

  async findForChannel({
    pageSize,
    pageNumber,
    channelId,
  }: GetArticleQueryDto) {
    return await this.articleRepo.findAndCount({
      where: { channelId },
      skip: pageSize * pageNumber - 1,
      take: pageSize,
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepo.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepo.delete(id);
  }
}
