import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './order-item.entity';

export class Order {
  private readonly _id: string;

  constructor(
    totalAmount: number,
    items: OrderItem[],
    createdAt: Date,
    id?: string,
  ) {
    this._id = id || uuidv4();
    this.totalAmount = totalAmount;
    this.items = items;
    this.createdAt = createdAt;
  }

  get id(): string {
    return this._id;
  }

  public readonly totalAmount: number;
  public readonly items: OrderItem[];
  public readonly createdAt: Date;
}
