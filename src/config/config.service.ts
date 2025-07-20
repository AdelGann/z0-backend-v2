import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const configModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
  load: [],
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
    SECRET_JWT: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
  }),
});
