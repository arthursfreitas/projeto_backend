import { CartItem } from 'src/cart-item/domain/cart-item.entity';
import { Quantity } from 'src/cart-item/domain/vo/quantity.vo';
import { User } from 'src/users/domain/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class Cart {
  private readonly _id: string;

  constructor(
    items: CartItem[] = [],
    public readonly user: User,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    enabled: boolean = true,
  ) {
    this._id = id || uuidv4();
    this.items = items;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this._deletedAt = deletedAt || null;
    this._enabled = enabled;
  }

  get id(): string {
    return this._id;
  }

  public readonly items: CartItem[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  private _deletedAt: Date | null;
  private _enabled: boolean;

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  addItem(item: CartItem): void {
    const existingItemIndex = this.items.findIndex(
      (i) => i.product.id === item.product.id,
    );

    if (existingItemIndex !== -1) {
      const existingItem = this.items[existingItemIndex];
      const updatedQuantity = new Quantity(
        existingItem.quantity.value + item.quantity.value,
      );
      const updatedItem = new CartItem(
        existingItem.product,
        updatedQuantity,
        existingItem.id,
      );
      this.items[existingItemIndex] = updatedItem;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productId: string, quantity: number): void {
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      const existingItem = this.items[index];
      const updatedQuantityValue = existingItem.quantity.value - quantity;
      if (updatedQuantityValue <= 0) {
        this.items.splice(index, 1);
      } else {
        const updatedItem = new CartItem(
          existingItem.product,
          new Quantity(updatedQuantityValue),
          existingItem.id,
        );
        this.items[index] = updatedItem;
      }
    }
  }

  get totalAmount(): number {
    return this.items.reduce((total, item) => total + item.totalPrice, 0);
  }

  disable(): void {
    this._enabled = false;
    this.setDeletedAt(new Date());
  }

  private setDeletedAt(date: Date): void {
    this._deletedAt = date;
  }
}
