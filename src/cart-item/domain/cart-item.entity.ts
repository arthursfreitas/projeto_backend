import { Product } from 'src/products/domain/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { Quantity } from './vo/quantity.vo';

export class CartItem {
  private readonly _id: string;

  constructor(product: Product, quantity: Quantity, id?: string) {
    this._id = id || uuidv4();
    this.product = product;
    this.quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  public readonly product: Product;
  public readonly quantity: Quantity;

  get totalPrice(): number {
    return this.product.price.value * this.quantity.value;
  }
}
