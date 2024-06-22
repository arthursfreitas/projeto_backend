export class Email {
  constructor(private readonly email: string) {
    if (!email.includes('@')) throw new Error('Invalid email address');
  }

  get value(): string {
    return this.email;
  }
}
