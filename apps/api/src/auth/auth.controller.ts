import { Body, Controller, HttpCode, Post, Res, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import * as express from 'express';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { AuthResponse, Login } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { UserRole } from '../shared';

@Controller(`auth`)
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  private setAuthCookies(res: express.Response, access: string, refresh: string) {
    const isProd = process.env.NODE_ENV === `production`;
    const domain = isProd ? process.env.COOKIE_DOMAIN : undefined; // ❌ don't set on localhost
    const sameSite = isProd ? (`none` as const) : (`lax` as const);
    const secure = isProd || process.env.COOKIE_SECURE === `true`;

    const common = {
      httpOnly: true,
      sameSite,
      secure,
      domain,
      path: `/`,
    };

    res.cookie(`access_token`, access, { ...common, maxAge: 1000 * 60 * 15 });
    res.cookie(`refresh_token`, refresh, { ...common, maxAge: 1000 * 60 * 60 * 24 * 7 });
  }

  @Post(`login`)
  @HttpCode(200)
  @ApiOkResponse({ type: AuthResponse })
  async login(
    @Req() req: express.Request,
    @Body() body: Login,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<AuthResponse> {
    const user = await this.auth.validateUser(body.email, body.password);
    const access = this.auth.signAccess(user);
    const refresh = this.auth.signRefresh(user);
    this.setAuthCookies(res, access, refresh);
    const response = { access_token: access };
    return response;
  }

  @Post(`refresh`)
  @HttpCode(200)
  refresh(@Res({ passthrough: true }) res: express.Response, @Body() body: object): AuthResponse {
    const key = `refresh_token` as const;
    const bodyRefreshToken = _.get(body, key);
    const cookies = res.req.get(`cookies`) as Record<string, string> | undefined;
    const resReqCookiesRefreshToken: string | null = cookies?.[key] ?? null;

    const rt = bodyRefreshToken || resReqCookiesRefreshToken;
    if (!rt) throw new Error(`No refresh token`);

    const payload = this.auth.verifyRefresh(rt);
    const fakeUser = { id: payload.sub, email: ``, role: UserRole.CLIENT };

    const access = this.auth.signAccess(fakeUser);
    const refresh = this.auth.signRefresh(fakeUser);
    this.setAuthCookies(res, access, refresh);
    return { access_token: access };
  }

  @Post(`logout`)
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie(`access_token`, { path: `/` });
    res.clearCookie(`refresh_token`, { path: `/` });
    return { ok: true };
  }

  @Get(`me`)
  @ApiBearerAuth(`jwt`)
  @UseGuards(JwtAuthGuard)
  whoami(@Req() req: express.Request) {
    return req.user;
  }

  @Get(`echo`)
  echo(@Req() req: express.Request) {
    return { cookies: req.cookies, auth: req.headers.authorization };
  }
}
