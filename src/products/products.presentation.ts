import { Product } from './domain/product.entity';

export interface ApiCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ApiCategory;
}

export class ProductPresentation {
  static toApi(product: Product): ApiProduct {
    return {
      id: product.id,
      name: product.name.value,
      description: product.description,
      price: product.price.value,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name.value,
            description: product.category.description,
          }
        : null,
    };
  }

  static toApiList(products: Product[]): ApiProduct[] {
    return products.map(this.toApi);
  }
}
