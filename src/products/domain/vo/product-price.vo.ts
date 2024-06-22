export class ProductPrice {
  constructor(private readonly price: number) {
    if (price <= 0) throw new Error('Product price must be positive');
  }

  get value(): number {
    return this.price;
  }
}
