import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { errors } from '../shared';
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
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string, isAdminApp = false) {
    const user = await this.users
      .createQueryBuilder(`u`)
      .addSelect(`u.passwordHash`)
      .where(`u.email = :email`, { email })
      .getOne();
    if (!user) {
      if (!isAdminApp) return this.createClient(email, pass);
      throw new UnauthorizedException(errors.INVALID_CREDENTIALS);
    }
    const ok = await bcrypt.compare(pass, user.passwordHash);
    if (!ok) throw new UnauthorizedException(errors.INVALID_CREDENTIALS);
    return user;
  }

  signAccess(user: Pick<User, `id` | `email` | `role`>) {
    return this.jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_ACCESS_TTL || `15m`,
      },
    );
  }

  signRefresh(user: Pick<User, `id`>) {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    return this.jwt.sign({ sub: user.id, typ: `refresh` }, { secret, expiresIn: process.env.JWT_REFRESH_TTL || `7d` });
  }

  verifyRefresh(token: string): RefreshTokenPayload {
    try {
      const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
      return this.jwt.verify(token, { secret });
    } catch {
      throw new UnauthorizedException(`Invalid refresh`);
    }
  }

  private async createClient(email: string, pass: string) {
    return this.users.save(
      this.users.create({
        email,
        name: email,
        passwordHash: await bcrypt.hash(pass, 10),
        role: `client`,
      }),
    );
  }
}
