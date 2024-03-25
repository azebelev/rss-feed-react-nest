import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortingEnum } from 'src/enums/sortingEnum';
import { Article } from 'src/persistence/entities/article.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
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

  async findForChannel(
    { pageSize, page, search, pubDateSorting }: GetArticleQueryDto,
    channelId: number,
  ) {
    const where: FindOptionsWhere<Article> = {
      channelId,
    };
    if (search) {
      where.title = ILike(`%${search}%`);
    }
    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    if (pubDateSorting === SortingEnum.Asc) {
      order.pubDate = 'ASC';
    } else {
      order.pubDate = 'DESC';
    }

    try {
      return await this.articleRepo.findAndCount({
        where,
        skip: pageSize * (page - 1),
        take: pageSize,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      return await this.articleRepo.update(id, updateArticleDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.articleRepo.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
