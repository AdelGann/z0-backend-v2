import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import {
  CreateClientInput,
  DeleteClientInput,
  SearchClientsForEmployeesInput,
  SearchClientsInput,
  UpdateClientInput,
} from './inputs/clients.input';
import { Status } from 'generated/prisma';

@Injectable()
export class ClientsService {
  constructor(private readonly dbService: DbService) {}

  getAll(params?: SearchClientsInput) {
    return this.dbService.clients.findMany({
      where: {
        ...(params && {
          ...params,
        }),
      },
    });
  }
  async getAllByEmployee(
    user_id: string,
    params: SearchClientsForEmployeesInput,
  ) {
    const user = await this.dbService.users.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const employee = await this.dbService.employees.findUnique({
      where: {
        org_id_user_id: {
          org_id: params.org_id,
          user_id: user.id,
        },
      },
    });

    if (employee === null) {
      throw new BadRequestException('Employee not found');
    }

    return this.dbService.clients.findMany({
      where: {
        org_id: params.org_id,
        employee_id: employee.id,
      },
    });
  }

  async create(data: CreateClientInput) {
    const { employee_id, ...rest } = data;

    const employee = await this.dbService.employees.findUnique({
      where: {
        id: employee_id,
      },
    });

    if (employee_id && employee === null) {
      throw new BadRequestException('Employee not found');
    }

    return this.dbService.clients.create({
      data: {
        ...rest,
        ...(employee &&
          employee_id && {
            employee_id: employee.id,
          }),
      },
    });
  }

  // TODO:  Revisar implementación
  // puede generar fallos de validación
  update(data: UpdateClientInput) {
    const { org_id, ...rest } = data;
    return this.dbService.clients.update({
      where: {
        org_id_doc_num: {
          org_id: org_id,
          doc_num: data.doc_num,
        },
      },
      data: {
        ...rest,
      },
    });
  }

  // Delete completamente lógico
  async delete(params: DeleteClientInput) {
    const { employee_id, id: client_id, org_id } = params;
    const client = await this.dbService.clients.findFirst({
      where: {
        org_id,
        id: client_id,
        ...(employee_id && {
          employee_id,
        }),
      },
    });
    if (client === null) {
      throw new BadRequestException('Client not found');
    }
    return this.dbService.clients.update({
      where: {
        id: client_id,
      },
      data: {
        status: Status.INACTIVE,
      },
    });
  }
}
