import { CreateUserModel } from '@draftio/shared/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async createOne(model: CreateUserModel) {
    await this.usersRepository.insert(model);
  }

  public findAll() {
    return this.usersRepository.find();
  }
}
