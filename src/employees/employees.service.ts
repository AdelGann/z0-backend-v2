import { Injectable } from '@nestjs/common';
import { employees } from 'generated/prisma';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DbService) {}

  async getAll(org_id: string) {
    return this.dbService.employees.findMany({
      where: {
        org_id,
      },
    });
  }

  //TODO: Agregar decorador para validar si el usuario que está realizando la operacion tiene permisos
  async create(user_id: string, org_id: string): Promise<employees> {
    return this.dbService.employees.create({
      data: {
        user_id: user_id,
        org_id: org_id,
      },
    });
  }
  async createMany() {}

  //TODO: Agregar decorador para validar si el usuario que está realizando la operacion tiene permisos
  async update(user_id: string, org_id: string) {}

  async remove(org_id: string, user_id: string): Promise<employees> {
    return this.dbService.employees.delete({
      where: {
        user_id,
        org_id,
      },
    });
  }
}
