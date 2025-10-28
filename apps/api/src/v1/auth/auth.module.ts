import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { parsedEnvs } from '@remoola/env';

import { AuthController } from './auth.controller';
import { providers } from './providers';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: parsedEnvs.JWT_SECRET,
      signOptions: { expiresIn: parsedEnvs.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: providers,
  exports: providers,
})
export class AuthModule {}
