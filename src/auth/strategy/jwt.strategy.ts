import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

import { Request } from 'express';
import { token_payload } from '../interfaces/Token_Payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          if (request?.headers?.authorization) {
            const auth = request.headers.authorization;
            return auth.startsWith('Bearer ') ? auth.slice(7) : auth;
          }
          return null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_JWT'),
    });
  }

  async validate(token: token_payload) {
    const user = await this.userService.getById(token.sub);
    return user;
  }
}
