import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { Roles } from '../../generated/prisma';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import { user_response } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  private async getFullUserData(id: string) {
    return this.db.users.findUnique({
      where: { id },
    });
  }

  async getById(id: string): Promise<user_response | null> {
    return this.db.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }

  async getByEmail(email: string): Promise<user_response | null> {
    return this.db.users.findUnique({
      where: {
        email,
      },
      omit: {
        password: true,
      },
    });
  }

  async getByUserName(userName: string): Promise<user_response | null> {
    return this.db.users.findUnique({
      where: {
        user_name: userName,
      },
      omit: {
        password: true,
      },
    });
  }

  async getAll(): Promise<user_response[]> {
    return this.db.users.findMany({
      omit: {
        password: true,
      },
    });
  }

  async create(user: CreateUserDto): Promise<user_response> {
    const user_name = await this.getByUserName(user.user_name);
    const email = await this.getByEmail(user.email);
    if (user_name !== null) {
      throw new BadRequestException('Username already taked');
    }
    if (email !== null) {
      throw new BadRequestException('Email already taked');
    }
    const newUser = await this.db.users.create({
      data: {
        ...user,
        role: Roles.USER,
      },
      omit: {
        password: true,
      },
    });
    await this.db.orgs.create({
      data: {
        name: `${user.user_name} Org`,
        founder_id: newUser.id,
      },
    });
    return newUser;
  }

  async createAdmin(user: CreateUserDto): Promise<user_response> {
    const user_name = await this.getByUserName(user.user_name);
    const email = await this.getByEmail(user.email);
    if (user_name !== null) {
      throw new BadRequestException('Username already taked');
    }
    if (email !== null) {
      throw new BadRequestException('Email already taked');
    }
    const newUser = await this.db.users.create({
      data: {
        ...user,
        role: Roles.ADMIN,
      },
      omit: {
        password: true,
      },
    });
    await this.db.orgs.create({
      data: {
        name: `${user.user_name} Org`,
        founder_id: newUser.id,
      },
    });
    return newUser;
  }

  async update(id: string, updateInput: UpdateUserDto): Promise<user_response> {
    const user = await this.getById(id);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    if (updateInput.email) {
      const email = await this.getByEmail(updateInput?.email);
      if (email !== null) {
        throw new BadRequestException('Email already exist');
      }
    }
    if (updateInput.user_name) {
      const user_name = await this.getByUserName(updateInput?.user_name);
      if (user_name !== null) {
        throw new BadRequestException('Email already exist');
      }
    }
    return this.db.users.update({
      where: { id: user.id },
      data: updateInput,
      omit: {
        password: true,
      },
    });
  }

  async updatePassword(
    id: string,
    updateInput: UpdatePasswordDto,
  ): Promise<user_response> {
    const user = await this.getFullUserData(id);
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
      omit: {
        password: true,
      },
    });
  }

  async delete(id: string): Promise<user_response> {
    const user = await this.getById(id);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    await this.db.users.delete({
      where: { id: user.id },
    });
    return user;
  }
}
