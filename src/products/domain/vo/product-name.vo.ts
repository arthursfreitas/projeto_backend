export class ProductName {
  constructor(private readonly name: string) {
    if (name.length === 0) throw new Error('Product name cannot be empty');
  }

  get value(): string {
    return this.name;
  }
}
