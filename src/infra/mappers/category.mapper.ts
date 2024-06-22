import { CategoryOrmEntity } from '../orm/category.orm-entity';
import { Category } from 'src/categories/domain/category.entity';
import { CategoryName } from 'src/categories/domain/vo/category-name.vo';
import { ProductMapper } from './product.mapper';

export class CategoryMapper {
  static toDomain(categoryOrm: CategoryOrmEntity): Category {
    if (!categoryOrm) {
      return null;
    }
    return new Category(
      new CategoryName(categoryOrm.name),
      categoryOrm.description,
      categoryOrm.products
        ? categoryOrm.products.map(ProductMapper.toDomain)
        : [],
      categoryOrm.id,
    );
  }

  static toOrm(category: Category): CategoryOrmEntity {
    const categoryOrm = new CategoryOrmEntity();

    categoryOrm.id = category.id;
    categoryOrm.name = category.name.value;
    categoryOrm.description = category.description;

    if (category.products) {
      categoryOrm.products = category.products.map(ProductMapper.toOrm);
    }

    return categoryOrm;
  }
}
