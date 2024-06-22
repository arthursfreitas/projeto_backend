export class Quantity {
  constructor(private readonly quantity: number) {
    if (quantity <= 0) throw new Error('Quantity must be positive');
  }

  get value(): number {
    return this.quantity;
  }
}
