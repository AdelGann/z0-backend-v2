import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { OrgService } from '../org/org.service';
import { Roles, users } from '../../generated/prisma';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import { user_response } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DbService,
    private readonly orgService: OrgService,
  ) {}

  // SOLO ADMINISTRADOR
  // Es más, ¿Es seguro que solo el administrador tenga accesos a estos datos?
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

  async getByEmail(email: string): Promise<users | null> {
    return this.db.users.findUnique({
      where: {
        email,
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
    await this.orgService.create(
      {
        name: `${user.user_name} Org`,
      },
      newUser.id,
    );
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
    await this.orgService.create(
      {
        name: `${user.user_name} Org`,
      },
      newUser.id,
    );
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
  // TODO: Rehacer logica de eliminación de usuarios
  // Falta alterar el esquema de prisma para admitir estados en lugar de eliminar físicamente
  async delete(id: string): Promise<user_response> {
    const user = await this.getById(id);
    if (user === null) {
      throw new BadRequestException('User not founded');
    }
    await this.db.orgs.deleteMany({
      where: {
        founder_id: user.id,
      },
    });
    await this.db.users.delete({
      where: { id: user.id },
    });
    return user;
  }
}
