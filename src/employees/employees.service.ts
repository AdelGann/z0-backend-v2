import { Injectable } from '@nestjs/common';
import { employees } from 'generated/prisma';
import { DbService } from 'src/common/db/db.service';
import { EmployeeDto } from './dto/employees.dto';

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
  async create(user_id: string, employee: EmployeeDto): Promise<employees> {
    return this.dbService.employees.create({
      data: {
        user_id: user_id,
        org_id: employee.org_id,
        role: employee.role,
      },
    });
  }

  // TODO: Realizar despues.
  async createMany() {}

  //TODO: Agregar decorador para validar si el usuario que está realizando la operacion tiene permisos
  async update(user_id: string, employee: EmployeeDto): Promise<employees> {
    return this.dbService.employees.update({
      where: {
        user_id,
        org_id: employee.org_id,
      },
      data: {
        doc_num: employee?.doc_num,
        update_at: new Date(),
        role: employee.role,
      },
    });
  }

  async remove(org_id: string, user_id: string): Promise<employees> {
    return this.dbService.employees.delete({
      where: {
        user_id,
        org_id,
      },
    });
  }
}
