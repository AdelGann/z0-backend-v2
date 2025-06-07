import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { Roles, users } from '../../generated/prisma';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async getById(id: string): Promise<users | null> {
    return this.db.users.findUnique({
      where: {
        id,
      },
    });
  }
  async getByEmail(email: string): Promise<users | null> {
    return this.db.users.findUnique({
      where: {
        email,
      },
    });
  }
  async getByUserName(userName: string): Promise<users | null> {
    return this.db.users.findUnique({
      where: {
        user_name: userName,
      },
    });
  }
  async getAll(): Promise<users[]> {
    return this.db.users.findMany();
  }
  async create(user: CreateUserDto): Promise<users> {
    const user_name = await this.getByUserName(user.user_name);
    const email = await this.getByEmail(user.email);
    if (user_name !== null) {
      throw new BadRequestException('Username already taked');
    }
    if (email !== null) {
      throw new BadRequestException('Email already taked');
    }
    return this.db.users.create({
      data: user,
    });
  }
  async createAdmin(user: CreateUserDto): Promise<users> {
    const user_name = await this.getByUserName(user.user_name);
    const email = await this.getByEmail(user.email);
    if (user_name !== null) {
      throw new BadRequestException('Username already taked');
    }
    if (email !== null) {
      throw new BadRequestException('Email already taked');
    }
    return this.db.users.create({
      data: {
        ...user,
        role: Roles.ADMIN,
      },
    });
  }
  async update(id: string, updateInput: UpdateUserDto): Promise<users> {
    const user = await this.getById(id);
    const email = await this.getByEmail(updateInput.email);
    const user_name = await this.getByUserName(updateInput.user_name);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    if (email !== null) {
      throw new BadRequestException('Email already exist');
    }
    if (user_name !== null) {
      throw new BadRequestException('Email already exist');
    }
    return this.db.users.update({
      where: { id: user.id },
      data: updateInput,
    });
  }
  async updatePassword(
    id: string,
    updateInput: UpdatePasswordDto,
  ): Promise<users> {
    const user = await this.getById(id);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    if (user.password === updateInput.password) {
      throw new BadRequestException(
        'The new password must be different from the current password',
      );
    }
    return this.db.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: updateInput.password,
      },
    });
  }
  async delete(id: string): Promise<users> {
    const user = await this.getById(id);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    return this.db.users.delete({ where: { id: user.id } });
  }
}
