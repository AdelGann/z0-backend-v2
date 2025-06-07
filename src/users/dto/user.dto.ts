import { users } from "../../../generated/prisma";

export type CreateUserDto = Pick<users,
    'full_name' |
    'user_name' |
    'email' |
    'password'
>
// User can only update full_name, email and his username
export type UpdateUserDto = Pick<users,
    'full_name' |
    'email' |
    'user_name'
>
// type for password update service
export type UpdatePasswordDto = Pick<users, "password">