import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAllV1() {
    return this.usersRepo.find();
  }

  create(dto: CreateUserDto) {
    return this.usersRepo.createAndSave(dto);
  }
}
