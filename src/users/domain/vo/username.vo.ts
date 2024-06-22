export class Username {
  constructor(private readonly name: string) {
    if (!name) throw new Error('Username cannot be empty');
  }

  get value(): string {
    return this.name;
  }
}
