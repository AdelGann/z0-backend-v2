import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async Login(credentials: LoginDto): Promise<string> {
    const { email, password } = credentials;
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new BadRequestException(`No user founded with email ${email}`);
    }
    const verify = await argon2.verify(user.password, password);
    if (!verify) {
      throw new UnauthorizedException('Incorrect Password');
    }
    return Promise.resolve('');
  }
  async Register(data: RegisterDto): Promise<string> {
    const { email, full_name, password, user_name } = data;
    const isValidUserName = await this.usersService.getByUserName(user_name);
    const isValidEmail = await this.usersService.getByEmail(email);
    if (!isValidEmail) {
      throw new BadRequestException('Email already taken');
    }
    if (!isValidUserName) {
      throw new BadRequestException('Username already taken');
    }
    const hashedPassword = await argon2.hash(password);
    const register_user = await this.usersService.create({
      email,
      user_name,
      full_name,
      password: hashedPassword,
    });
    return Promise.resolve('');
  }
}
