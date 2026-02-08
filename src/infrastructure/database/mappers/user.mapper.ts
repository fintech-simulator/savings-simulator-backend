import { User } from '../../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(ormUser: UserOrmEntity): User {
    return new User({
      id: ormUser.id,
      name: ormUser.name,
      document: ormUser.document,
      email: ormUser.email,
      password: ormUser.password,
      createdAt: ormUser.createdAt,
    });
  }

  static toOrm(user: User): UserOrmEntity {
    const ormUser = new UserOrmEntity();
    ormUser.id = user.id;
    ormUser.name = user.name;
    ormUser.document = user.document;
    ormUser.email = user.email;
    ormUser.password = user.password;
    ormUser.createdAt = user.createdAt;
    return ormUser;
  }
}
