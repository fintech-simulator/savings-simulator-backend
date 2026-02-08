import { User } from '../entities/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByDocument(document: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | null>;
}

export const UserRepositoryToken = Symbol('UserRepository');
