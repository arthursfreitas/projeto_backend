import { Cart } from 'src/cart/domain/cart.entity';

export interface UserDto {
  userId?: string;
  username: string;
  email: string;
  password: string;
  carts?: Cart[];
}
