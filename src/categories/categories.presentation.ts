import { Category } from './domain/category.entity';

export interface ApiCategory {
  id: string;
  name: string;
  description?: string;
  products: ApiProduct[];
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

export class CategoryPresentation {
  static toApi(category: Category): ApiCategory {
    return {
      id: category.id,
      name: category.name.value,
      description: category.description,
      products: category.products.map((product) => ({
        id: product.id,
        name: product.name.value,
        description: product.description,
        price: product.price.value,
      })),
    };
  }

  static toApiList(categories: Category[]): ApiCategory[] {
    return categories.map(this.toApi);
  }
}
