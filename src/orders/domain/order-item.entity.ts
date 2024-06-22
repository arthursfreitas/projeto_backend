import { Product } from '../../products/domain/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class OrderItem {
  private readonly _id: string;

  constructor(product: Product, quantity: number, price: number, id?: string) {
    this._id = id || uuidv4();
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  get id(): string {
    return this._id;
  }

  public readonly product: Product;
  public readonly quantity: number;
  public readonly price: number;
}
