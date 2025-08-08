import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JWT_DTO } from './interfaces/Jwt_Response.interface';
import { UsersService } from 'src/users/users.service';
import { LoginInput, RegisterInput } from './inputs/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async Login(credentials: LoginInput): Promise<JWT_DTO> {
    const { email, password } = credentials;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new BadRequestException(`No user founded with email ${email}`);
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    return {
      access_token: await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
        role: user.role,
      }),
    };
  }
  async Register(data: RegisterInput): Promise<JWT_DTO> {
    const { email, full_name, password, user_name } = data;
    const isValidUserName = await this.usersService.getByUserName(user_name);
    const isValidEmail = await this.usersService.getByEmail(email);

    if (isValidEmail !== null) {
      throw new BadRequestException('Email already taken');
    }

    if (isValidUserName !== null) {
      throw new BadRequestException('Username already taken');
    }

    const hashedPassword: string = await argon2.hash(password);

    if (!hashedPassword) {
      throw new BadGatewayException('Something went wrong while hash');
    }

    const register_user = await this.usersService.create({
      email,
      user_name,
      full_name,
      password: hashedPassword,
    });

    return {
      access_token: await this.jwtService.signAsync({
        email: register_user.email,
        sub: register_user.id,
        role: register_user.role,
      }),
    };
  }
}
