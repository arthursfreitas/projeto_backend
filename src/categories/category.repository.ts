import { Category } from './domain/category.entity';
import { CategoryOrmEntity } from '../infra/orm/category.orm-entity';
import { CategoryName } from './domain/vo/category-name.vo';

export class CategoryRepository {
  static toDomain(ormEntity: CategoryOrmEntity): Category {
    return new Category(
      new CategoryName(ormEntity.name),
      ormEntity.description,
    );
  }

  static toOrm(domainEntity: Category): CategoryOrmEntity {
    const ormEntity = new CategoryOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name.value;
    ormEntity.description = domainEntity.description;
    return ormEntity;
  }
}
