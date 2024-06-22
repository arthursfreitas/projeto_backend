import { v4 as uuidv4 } from 'uuid';
import { Email } from './vo/email.vo';
import { Password } from './vo/password.vo';
import { Username } from './vo/username.vo';
import { Cart } from 'src/cart/domain/cart.entity';

export class User {
  private readonly _id: string;

  constructor(
    public readonly username: Username,
    public readonly email: Email,
    public readonly password: Password,
    id?: string,
    public carts: Cart[] = [],
  ) {
    this._id = id || uuidv4();
  }

  get id(): string {
    return this._id;
  }
}
