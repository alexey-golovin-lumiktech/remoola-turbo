import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller({ path: `users`, version: `1` })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll() {
    return this.service.findAllV1();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }
}
