import { Cart } from './domain/cart.entity';

export interface ApiCartItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: {
      id: string;
      name: string;
      description: string;
    } | null;
  };
  quantity: number;
  totalPrice: number;
}

export interface ApiCart {
  id: string;
  items: ApiCartItem[];
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export class CartPresentation {
  static toApi(cart: Cart): ApiCart {
    return {
      id: cart.id,
      items: cart.items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name.value,
          description: item.product.description,
          price: item.product.price.value,
          category: item.product.category
            ? {
                id: item.product.category.id,
                name: item.product.category.name.value,
                description: item.product.category.description,
              }
            : null,
        },
        quantity: item.quantity.value,
        totalPrice: item.totalPrice,
      })),
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      user: {
        id: cart.user.id,
        username: cart.user.username.value,
        email: cart.user.email.value,
      },
    };
  }

  static toApiList(carts: Cart[]): ApiCart[] {
    return carts.map(this.toApi);
  }
}
