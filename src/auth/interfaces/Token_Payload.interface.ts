import { Roles } from "generated/prisma";

export interface token_payload {
    sub: string;
    email: string;
    role: Roles
}