export class User {
  id: string;
  name: string;
  document: string;
  email: string;
  password?: string;
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
