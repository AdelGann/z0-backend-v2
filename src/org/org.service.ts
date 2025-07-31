import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DbService } from 'src/common/db/db.service';
import { CreateOrgDto, UpdateOrgDto } from './dto/org.dto';

@Injectable()
export class OrgService {
  constructor(
    private readonly dbService: DbService,
    private readonly usersService: UsersService,
  ) {}

  // Solo para apartado administrador
  async getAll() {
    return this.dbService.orgs.findMany();
  }

  // Servicio solo valido para usuarios miembros de una organización, NO externos
  // ¿Es necesario validar que el usuario sea miembro de la organización?
  // ¿Tan siquiera es necesario un get por id?
  async getById(id: string) {
    return this.dbService.orgs.findUnique({
      where: { id },
    });
  }

  // Reutilizar servicio para la creación de usuarios
  async create(org: CreateOrgDto, founder_id: string) {
    const user = await this.usersService.getById(founder_id);
    if (user === null) {
      throw new NotFoundException('User not founded');
    }
    return this.dbService.orgs.create({
      data: {
        name: org.name,
        founder_id: user.id,
        created_at: new Date(),
        update_at: new Date(),
      },
    });
  }

  // SOLO administradores de la organización
  // Debería agregar el ID de la organización en el DTO?
  async update(updateOrg: UpdateOrgDto, founder_id: string) {
    const user = await this.usersService.getById(founder_id);
    const org = await this.dbService.orgs.findUnique({
      where: { id: updateOrg.id },
    });
    if (user === null) {
      throw new NotFoundException('User not founded');
    }
    if (org === null) {
      throw new NotFoundException('Organization not founded');
    }
    //TODO: falta validar usuarios empleados que tengan permisos para modificar
    //?: Aunque no es necesario que más de una persona pueda modificar la organización.
    //Evaluar
    if (org.founder_id !== user.id) {
      throw new ForbiddenException(
        'You are not the founder of this organization',
      );
    }
    return this.dbService.orgs.update({
      where: { id: org.id },
      data: {
        name: updateOrg.name,
        update_at: new Date(),
      },
    });
  }

  // Servicio debería inactivar la organización, de momento se está trabajando con eliminado fisico
  // Realizar despues de terminar de cambiar el prisma.
  // TODO: CAMBIAR eliminado fisico a lógico.
  async delete() {}
}
