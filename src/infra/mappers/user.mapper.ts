import { UserOrmEntity } from '../orm/user.orm-entity';
import { User } from '../../users/domain/user.entity';
import { Username } from '../../users/domain/vo/username.vo';
import { Email } from '../../users/domain/vo/email.vo';
import { Password } from '../../users/domain/vo/password.vo';
import { CartMapper } from './cart.mapper';

export class UserMapper {
  static toDomain(userOrm: UserOrmEntity): User {
    return new User(
      new Username(userOrm.username),
      new Email(userOrm.email),
      new Password(userOrm.password),
      userOrm.id,
      userOrm.carts ? userOrm.carts.map(CartMapper.toDomain) : [],
    );
  }

  static toOrm(user: User): UserOrmEntity {
    const userOrm = new UserOrmEntity();
    userOrm.id = user.id;
    userOrm.username = user.username.value;
    userOrm.email = user.email.value;
    userOrm.password = user.password.value;
    userOrm.carts = user.carts ? user.carts.map(CartMapper.toOrm) : [];
    return userOrm;
  }
}
