import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserEntity } from './user.entity';
import { BaseRepository } from '../../core/repository/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}
