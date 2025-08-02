import { users } from 'generated/prisma';

export type user_response = Omit<users, 'password'>;
