import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../common/db/db.service';
import { EmployeesService } from '../employees/employees.service';
import { CreateOrgInput, SelectOrgInput, UpdateOrgInput } from './inputs/org.input';

@Injectable()
export class OrgService {
  // FUNFACT: Fuese GoLang y esto se daña por importar funciones en orden cerrado
  constructor(
    private readonly dbService: DbService,
    private readonly employeesService: EmployeesService,
  ) {}

  //NOTE: Solo para apartado administrador
  async getAll() {
    return this.dbService.orgs.findMany();
  }
  // NOTE: esto en teoria será para cuando se vaya a iniciar sesión
  // Entonces el usuario podrá elegir entre organizaciones
  async getAllOrgByUser(user_id: string): Promise<SelectOrgInput[]> {
    return this.dbService.orgs.findMany({
      where: {
        employees: {
          some: {
            user_id,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  //NOTE: 30/07
  // Servicio solo valido para usuarios miembros de una organización, NO externos
  // ¿Es necesario validar que el usuario sea miembro de la organización?
  // ¿Tan siquiera es necesario un get por id?

  //NOTE: 31/07: no importa, como sea, al usar el guardian ya no hace falta hacer alguna validación extra
  async getById(id: string) {
    return this.dbService.orgs.findUnique({
      where: { id },
    });
  }

  async create(org: CreateOrgInput, founder_id: string) {
    const user = await this.dbService.users.findUnique({
      where: { id: founder_id },
    });
    if (user === null) {
      throw new NotFoundException('User not founded');
    }
    const new_org = await this.dbService.orgs.create({
      data: {
        name: org.name,
        founder_id: user.id,
        created_at: new Date(),
        update_at: new Date(),
      },
    });
    await this.employeesService.create(user.id, {
      org_id: new_org.id,
      role: 'ADMIN',
    });
    return new_org;
  }

  // NOTE: SOLO administradores de la organización
  // Debería agregar el ID de la organización en el Input?
  async update(updateOrg: UpdateOrgInput) {
    //const user = await this.usersService.getById(founder_id);
    //if (user === null) {
    //  throw new NotFoundException('User not founded');
    //}
    //TODO: falta validar usuarios empleados que tengan permisos para modificar
    //?: Aunque no es necesario que más de una persona pueda modificar la organización.
    //Evaluar
    //FIX: Removeré esta condición, debido a que se agrega un decorador que valida roles, no es necesario esto
    //if (org.founder_id !== user.id) {
    //  throw new ForbiddenException(
    //    'You are not the founder of this organization',
    //  );
    //}
    return this.dbService.orgs.update({
      where: { id: updateOrg.id },
      data: {
        name: updateOrg.name,
        update_at: new Date(),
      },
    });
  }

  //NOTE: Servicio debería inactivar la organización, de momento se está trabajando con eliminado fisico
  // Realizar despues de terminar de cambiar el prisma.
  // TODO: CAMBIAR eliminado fisico a lógico.
  async delete() {}
}
