import { CategoryName } from './vo/category-name.vo';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/products/domain/product.entity';

export class Category {
  private readonly _id: string;

  constructor(
    name: CategoryName,
    description?: string,
    products?: Product[],
    id?: string,
  ) {
    this._id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.products = products || [];
  }

  get id(): string {
    return this._id;
  }

  public readonly name: CategoryName;
  public readonly description?: string;
  public readonly products: Product[];
}
