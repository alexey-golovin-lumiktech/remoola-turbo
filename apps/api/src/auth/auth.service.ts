import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

interface RefreshTokenPayload {
  sub: string;
  phone: string;
  exp: number;
  iat: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository
      .createQueryBuilder(`u`)
      .addSelect(`u.passwordHash`)
      .where(`u.email = :email`, { email })
      .getOne();
    if (!user) {
      await this.usersRepository.save(
        this.usersRepository.create({
          email,
          name: email,
          passwordHash: await bcrypt.hash(pass, 10),
        }),
      );
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const ok = await bcrypt.compare(pass, user.passwordHash);
    if (!ok) throw new UnauthorizedException(`Invalid credentials`);
    return user;
  }

  signAccess(user: Pick<User, `id` | `email` | `role`>) {
    return this.jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_ACCESS_TTL || `15m`,
      },
    );
  }

  signRefresh(user: Pick<User, `id`>) {
    const secret = process.env.JWT_REFRESH_SECRET! || process.env.JWT_SECRET!;
    return this.jwt.sign({ sub: user.id, typ: `refresh` }, { secret, expiresIn: process.env.JWT_REFRESH_TTL || `7d` });
  }

  verifyRefresh(token: string): RefreshTokenPayload {
    try {
      const secret = process.env.JWT_REFRESH_SECRET! || process.env.JWT_SECRET!;
      return this.jwt.verify(token, { secret });
    } catch {
      throw new UnauthorizedException(`Invalid refresh`);
    }
  }
}
