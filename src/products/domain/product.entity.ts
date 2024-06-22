import { ProductName } from './vo/product-name.vo';
import { ProductPrice } from './vo/product-price.vo';
import { v4 as uuidv4 } from 'uuid';
import { Category } from 'src/categories/domain/category.entity';

export class Product {
  private readonly _id: string;

  constructor(
    name: ProductName,
    description: string,
    category: Category,
    price: ProductPrice,
    id?: string,
  ) {
    this._id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
  }

  get id(): string {
    return this._id;
  }

  public readonly name: ProductName;
  public readonly description: string;
  public readonly category: Category;
  public readonly price: ProductPrice;
}
