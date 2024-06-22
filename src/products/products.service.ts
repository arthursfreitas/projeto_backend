import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/infra/base.service';
import { ProductMapper } from 'src/infra/mappers';
import { ProductOrmEntity } from 'src/infra/orm';
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Product } from './domain/product.entity';
import { ProductName } from './domain/vo/product-name.vo';
import { ProductPrice } from './domain/vo/product-price.vo';
import { CreateProductDto } from './dtos/create-product.dto';
import { PRODUCT_PROVIDER_TOKEN } from './products.providers';
import { CategoriesService } from 'src/categories/categories.service';
import { QueryProductDto } from './dtos/query-product.dto';

@Injectable()
export class ProductsService extends BaseService<Product, ProductOrmEntity> {
  constructor(
    @Inject(PRODUCT_PROVIDER_TOKEN)
    private productRepository: Repository<ProductOrmEntity>,
    private readonly categoryService: CategoriesService,
  ) {
    super(productRepository, ProductMapper.toDomain, ProductMapper.toOrm);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findOne(
      createProductDto.category,
    );

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    const product = new Product(
      new ProductName(createProductDto.name),
      createProductDto.description,
      category,
      new ProductPrice(createProductDto.price),
    );

    return super.create(product);
  }

  async findAllWithQuery(query: QueryProductDto): Promise<Product[]> {
    const options: FindManyOptions<ProductOrmEntity> = {
      where: this.buildWhereOptions(query),
      relations: this.getRelations(),
    };

    const products = await this.productRepository.find(options);
    return products.map(ProductMapper.toDomain);
  }

  protected getRelations(): string[] {
    return ['category'];
  }

  private buildWhereOptions(query: QueryProductDto): Record<string, any> {
    const where: Record<string, any> = {};

    if (query.category) {
      where.category = { name: Like(`%${query.category}%`) };
    }

    if (query.minPrice !== undefined && query.maxPrice !== undefined) {
      where.price = Between(query.minPrice, query.maxPrice);
    } else {
      if (query.minPrice !== undefined) {
        where.price = MoreThanOrEqual(query.minPrice);
      }
      if (query.maxPrice !== undefined) {
        where.price = LessThanOrEqual(query.maxPrice);
      }
    }

    return where;
  }
}
