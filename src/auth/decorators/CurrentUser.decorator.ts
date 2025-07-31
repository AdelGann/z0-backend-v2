import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { users } from 'generated/prisma';
import { token_payload } from '../interfaces/Token_Payload.interface';
import { Request } from 'express';

interface request extends Request {
  user: users | token_payload;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
