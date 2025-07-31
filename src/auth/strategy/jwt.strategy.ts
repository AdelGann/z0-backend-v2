import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

import { Request } from 'express';
import { token_payload } from '../interfaces/Token_Payload.interface';

interface RequestWithConnection extends Request {
  connectionParams?: {
    Authorization: string;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithConnection): string | null => {
          if (request?.connectionParams?.Authorization) {
            const auth = request.connectionParams.Authorization;
            return auth.startsWith('Bearer ') ? auth.slice(7) : auth;
          }
          if (request?.headers?.authorization) {
            const auth = request.headers.authorization;
            return auth.startsWith('Bearer ') ? auth.slice(7) : auth;
          }
          if (request?.cookies?.token) {
            const token: string = request.cookies.token;
            return token;
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
