export class Password {
  constructor(private readonly password: string) {
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters long');
  }

  get value(): string {
    return this.password;
  }
}
