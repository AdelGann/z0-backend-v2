import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DbService } from '../common/db/db.service';
import { Roles, users } from '../../generated/prisma';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';

const dbMock = {
  users: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  orgs: {
    create: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DbService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('db should be defined', () => {
    expect(dbService).toBeDefined();
  });
  describe('Create Functions', () => {
    describe('Create User Function', () => {
      it('should be defined', () => {
        expect(typeof service.create).toBe('function');
      });
      it('should create a user', async () => {
        // Simulamos que no existe ningún usuario
        jest.spyOn(dbService.users, 'findUnique').mockResolvedValue(null);

        const createSpy = jest
          .spyOn(dbService.users, 'create')
          .mockResolvedValue(result);
        const orgSpy = jest.spyOn(dbService.orgs, 'create').mockResolvedValue({
          name: `${mocked_data.user_name} Org`,
          founder_id: result.id,
          id: uuidv4(),
          created_at: new Date(),
          update_at: new Date(),
        });

        const user = await service.create(mocked_data);

        expect(createSpy).toHaveBeenCalledWith({
          data: {
            ...mocked_data,
            role: Roles.USER,
          },
          omit: {
            password: true,
          },
        });

        expect(orgSpy).toHaveBeenCalledWith({
          data: {
            name: `${mocked_data.user_name} Org`,
            founder_id: result.id,
          },
        });
        expect(user).toEqual(result);
        expect(user.role).toEqual(Roles.USER);
      });
      it('should throw BadRequest if Username already exists', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(result);

        await expect(service.create(mocked_data)).rejects.toThrow(
          new BadRequestException('Username already taked'),
        );

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            user_name: mocked_data.user_name,
          },
          omit: {
            password: true,
          },
        });
      });
      it('should throw BadRequest if Email already exists', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(result);

        await expect(service.create(mocked_data)).rejects.toThrow(
          new BadRequestException('Email already taked'),
        );

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            email: mocked_data.email,
          },
        });
      });
    });
    describe('Create Admin Function', () => {
      it('should be defined', () => {
        expect(typeof service.createAdmin).toBe('function');
      });
      it('should create a user', async () => {
        jest.spyOn(dbService.users, 'findUnique').mockResolvedValue(null);

        const createSpy = jest
          .spyOn(dbService.users, 'create')
          .mockResolvedValue(admin_result);
        const orgSpy = jest.spyOn(dbService.orgs, 'create').mockResolvedValue({
          name: `${mocked_data.user_name} Org`,
          founder_id: result.id,
          id: uuidv4(),
          created_at: new Date(),
          update_at: new Date(),
        });
        const user = await service.createAdmin(mocked_data);

        expect(createSpy).toHaveBeenCalledWith({
          data: {
            ...mocked_data,
            role: Roles.ADMIN,
          },
          omit: {
            password: true,
          },
        });
        expect(orgSpy).toHaveBeenCalledWith({
          data: {
            name: `${mocked_data.user_name} Org`,
            founder_id: result.id,
          },
        });
        expect(user).toEqual(admin_result);
        expect(user.role).toEqual(Roles.ADMIN);
      });
      it('should throw BadRequest if Username already exists', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(admin_result);

        await expect(service.createAdmin(mocked_data)).rejects.toThrow(
          new BadRequestException('Username already taked'),
        );

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            user_name: mocked_data.user_name,
          },
          omit: {
            password: true,
          },
        });
      });
      it('should throw BadRequest if Email already exists', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(admin_result);

        await expect(service.createAdmin(mocked_data)).rejects.toThrow(
          new BadRequestException('Email already taked'),
        );

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            email: mocked_data.email,
          },
        
        });
      });
    });
  });
  describe(`Getter Functions`, () => {
    describe('Get By ID', () => {
      it('should be defined', () => {
        expect(typeof service.getById).toBe('function');
      });
      it('should get someone by id', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(result);

        const user = await service.getById(result.id);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: { id: result.id },
          omit: {
            password: true,
          },
        });
        expect(user).toEqual(result);
      });
      it('should return nothing if doesnt exist id', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(null);

        const user = await service.getById(result.id);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            id: result.id,
          },
          omit: {
            password: true,
          },
        });
        expect(user).toEqual(null);
      });
    });
    describe('Get By Email', () => {
      it('should be defined', () => {
        expect(typeof service.getByEmail).toBe('function');
      });
      it('should get someone by email', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(result);

        const user = await service.getByEmail(result.email);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: { email: result.email },
        });
        expect(user).toEqual(result);
      });
      it('should return nothing if doesnt exist email', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(null);

        const user = await service.getByEmail(result.email);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            email: result.email,
          },
        });
        expect(user).toEqual(null);
      });
    });
    describe('Get By Username', () => {
      it('should be defined', () => {
        expect(typeof service.getByUserName).toBe('function');
      });
      it('should get someone by username', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(result);

        const user = await service.getByUserName(result.user_name);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: { user_name: result.user_name },
          omit: {
            password: true,
          },
        });
        expect(user).toEqual(result);
      });
      it('should return nothing if doesnt exist username', async () => {
        const findUniqueSpy = jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(null);

        const user = await service.getByUserName(result.user_name);

        expect(findUniqueSpy).toHaveBeenCalledWith({
          where: {
            user_name: result.user_name,
          },
          omit: {
            password: true,
          },
        });
        expect(user).toEqual(null);
      });
    });
    describe('Get All', () => {
      it('should be defined', () => {
        expect(typeof service.getAll).toBe('function');
      });
      it('should get all users', async () => {
        const findManySpy = jest
          .spyOn(dbService.users, 'findMany')
          .mockResolvedValue([result, admin_result]);

        const users = await service.getAll();

        expect(findManySpy).toHaveBeenCalledWith({
          omit: {
            password: true,
          },
        });
        expect(users).toEqual([result, admin_result]);
      });
      it("should return an empty array if doesn't have any data", async () => {
        const findManySpy = jest
          .spyOn(dbService.users, 'findMany')
          .mockResolvedValue([]);

        const users = await service.getAll();

        expect(findManySpy).toHaveBeenCalledWith({
          omit: {
            password: true,
          },
        });
        expect(users).toEqual([]);
      });
    });
  });
  describe('Update Functions', () => {
    describe('Update User Information Function', () => {
      const body = {
        email: 'new_email@gmail.com',
        full_name: 'John Doe',
        user_name: 'john@doe',
      };
      it('should be defined', () => {
        expect(typeof service.update).toBe('function');
      });

      it('should update an user', async () => {
        jest.spyOn(service, 'getById').mockResolvedValue(result);
        jest.spyOn(service, 'getByEmail').mockResolvedValue(null);
        jest.spyOn(service, 'getByUserName').mockResolvedValue(null);

        const updateSpy = jest
          .spyOn(dbService.users, 'update')
          .mockResolvedValue({
            ...result,
            ...body,
          });

        const user = await service.update(result.id, body);

        expect(updateSpy).toHaveBeenCalledWith({
          where: { id: result.id },
          data: body,
          omit: {
            password: true,
          },
        });
        expect(user).toEqual({
          ...result,
          ...body,
        });
      });

      it('should throw BadRequest if user does not exist', async () => {
        jest.spyOn(service, 'getById').mockResolvedValue(null);

        await expect(service.update(result.id, body)).rejects.toThrow(
          new BadRequestException('User not founded'),
        );
      });

      it('should throw BadRequest if email already exists', async () => {
        jest.spyOn(service, 'getById').mockResolvedValue(result);
        jest.spyOn(service, 'getByEmail').mockResolvedValue(admin_result);
        jest.spyOn(service, 'getByUserName').mockResolvedValue(null);

        const bodyWithExistingEmail = {
          ...body,
          email: admin_result.email,
        };

        await expect(
          service.update(result.id, bodyWithExistingEmail),
        ).rejects.toThrow(new BadRequestException('Email already exist'));
      });

      it('should throw BadRequest if username already exists', async () => {
        jest.spyOn(service, 'getById').mockResolvedValue(result);
        jest.spyOn(service, 'getByEmail').mockResolvedValue(null);
        jest.spyOn(service, 'getByUserName').mockResolvedValue(admin_result);

        const bodyWithExistingUsername = {
          ...body,
          user_name: admin_result.user_name,
        };

        await expect(
          service.update(result.id, bodyWithExistingUsername),
        ).rejects.toThrow(new BadRequestException('Email already exist'));
      });
    });
    describe('Update User Password Function', () => {
      it('should be defined', () => {
        expect(typeof service.updatePassword).toBe('function');
      });
      it('should update an user password', async () => {
        const fullUserData = { ...result, password: 'old_password' };
        jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(fullUserData);

        const new_password = 'new_password';
        const body = {
          password: new_password,
        };
        const updateSpy = jest
          .spyOn(dbService.users, 'update')
          .mockResolvedValue({
            ...result,
            password: new_password,
          });

        const user = await service.updatePassword(result.id, body);

        expect(updateSpy).toHaveBeenCalledWith({
          where: {
            id: result.id,
          },
          data: {
            password: new_password,
          },
          omit: {
            password: true,
          },
        });
        expect(user).toEqual({
          ...result,
          password: new_password,
        });
      });
      it('should throw BadRequest if user not found', async () => {
        jest.spyOn(dbService.users, 'findUnique').mockResolvedValue(null);
        const body = {
          password: 'new_password',
        };

        await expect(service.updatePassword(result.id, body)).rejects.toThrow(
          new BadRequestException('User not founded'),
        );
      });
      it('should throw BadRequest if new password is same as current', async () => {
        const fullUserData = { ...result, password: 'same_password' };
        jest
          .spyOn(dbService.users, 'findUnique')
          .mockResolvedValue(fullUserData);

        const body = {
          password: 'same_password',
        };

        await expect(service.updatePassword(result.id, body)).rejects.toThrow(
          new BadRequestException(
            'The new password must be different from the current password',
          ),
        );
      });
    });
  });
  describe(`Delete Function`, () => {
    it('should be defined', () => {
      expect(typeof service.delete).toBe('function');
    });

    it('should delete an user', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(result);
      const deleteSpy = jest
        .spyOn(dbService.users, 'delete')
        .mockResolvedValue(result);

      const user = await service.delete(result.id);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: result.id },
      });
      expect(user).toEqual(result);
    });

    it('should throw BadRequest if user does not exist', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);

      await expect(service.delete(result.id)).rejects.toThrow(
        new BadRequestException('User not founded'),
      );
    });
  });
});

const mocked_data: CreateUserDto = {
  full_name: 'Adel Gannem',
  user_name: 'AdelG',
  email: 'mocked_email@gmail.com',
  password: 'mocked_password',
};
const result: users = {
  id: uuidv4(),
  ...mocked_data,
  user_name: mocked_data.user_name,
  created_at: new Date(),
  update_at: new Date(),
  role: Roles.USER,
};
const admin_result: users = {
  id: uuidv4(),
  ...mocked_data,
  user_name: mocked_data.user_name,
  created_at: new Date(),
  update_at: new Date(),
  role: Roles.ADMIN,
};
