export class CategoryName {
  constructor(private readonly name: string) {
    if (name.length === 0) {
      throw new Error('Category name cannot be empty');
    }
  }

  get value(): string {
    return this.name;
  }
}
