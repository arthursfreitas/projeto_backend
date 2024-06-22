import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/infra/base.service';
import { CategoryMapper } from 'src/infra/mappers';
import { CategoryOrmEntity } from 'src/infra/orm';
import { Repository } from 'typeorm';
import { CATEGORY_PROVIDER_TOKEN } from './categories.providers';
import { Category } from './domain/category.entity';
import { CategoryName } from './domain/vo/category-name.vo';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  CategoryOrmEntity
> {
  constructor(
    @Inject(CATEGORY_PROVIDER_TOKEN)
    private readonly categoryRepository: Repository<CategoryOrmEntity>,
  ) {
    super(categoryRepository, CategoryMapper.toDomain, CategoryMapper.toOrm);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if (!createCategoryDto.name) {
      throw new BadRequestException('Category name must be provided');
    }

    const category = new Category(
      new CategoryName(createCategoryDto.name),
      createCategoryDto.description,
    );

    return super.create(category);
  }

  protected getRelations(): string[] {
    return ['products'];
  }
}
