import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { Expose } from 'class-transformer';
import { ILogin, IAuthResponse } from '../../shared';

export class Login implements ILogin {
  @Expose() @ApiProperty({ example: `remoola@example.com` }) @IsEmail() email!: string;
  @Expose() @ApiProperty({ example: `remoola` }) @IsString() @MinLength(4) password!: string;
}

export class AuthResponse implements IAuthResponse {
  @Expose() @ApiProperty() access_token!: string;
}
