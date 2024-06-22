import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../infra/orm/user.orm-entity';
import { UserMapper } from '../infra/mappers/user.mapper';
import { User } from './domain/user.entity';
import { USER_PROVIDER_TOKEN } from './users.providers';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseService } from 'src/infra/base.service';
import { Username } from './domain/vo/username.vo';
import { Email } from './domain/vo/email.vo';
import { Password } from './domain/vo/password.vo';

@Injectable()
export class UsersService extends BaseService<User, UserOrmEntity> {
  constructor(
    @Inject(USER_PROVIDER_TOKEN)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {
    super(userRepository, UserMapper.toDomain, UserMapper.toOrm);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const userOrm = await this.userRepository.findOne({
      where: { username },
    });
    return userOrm ? UserMapper.toDomain(userOrm) : null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      new Username(createUserDto.username),
      new Email(createUserDto.email),
      new Password(createUserDto.password),
    );
    return super.create(user);
  }
}
