import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  //TODO: Agregar validaciones en caso se agregue un usuario o id de organización no existente
  async update(user_id: string, employee: EmployeeDto): Promise<employees> {
    return this.dbService.employees.update({
      where: {
        org_id_user_id: {
          user_id,
          org_id: employee.org_id,
        },
      },
      data: {
        doc_num: employee?.doc_num,
        update_at: new Date(),
        role: employee.role,
      },
    });
  }
  // TODO: Agregar Validaciones para evitar que se puedn eliminar:
  // Usuarios realizando la misma operación
  // administrador tratando de eliminar a un fundador
  // administrador tratando de eliminar a otro administrador
  async remove(
    org_id: string,
    user_id: string,
    admin_id: string,
  ): Promise<employees> {
    if (user_id === admin_id) {
      throw new ForbiddenException('You cannot delete an yourself dumbass');
    }
    const employee = await this.dbService.employees.findFirst({
      where: {
        user_id,
      },
    });
    const admin = (await this.dbService.employees.findFirst({
      where: {
        user_id: admin_id,
      },
    })) as employees; // assertion; debido a que el admin siempre va a ser encontrado
    const org = await this.dbService.orgs.findFirst({
      where: {
        id: org_id,
      },
    });
    if (!org) {
      throw new NotFoundException('Organization not founded');
    }
    if (!employee) {
      throw new NotFoundException('Employee not founded');
    }
    if (employee.role === admin.role) {
      throw new ForbiddenException('You cannot delete another admin dumbass');
    }
    return this.dbService.employees.delete({
      where: {
        org_id_user_id: {
          user_id,
          org_id,
        },
      },
    });
  }
}
