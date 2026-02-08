export class Product {
  id: string;
  name: string;
  type: string;
  description: string;
  interestRate: number; // e.g., 0.12 for 12% E.A.
  minAmount: number;
  imageUrl?: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
