import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DbService) {}

  async getAll(org_id: string, user_id: string) {
    // Debe devolver un arreglo de datos de productos por organización
    // no voy a trabajar por permisos, solo agregar validación en caso se trate de obtener el listado
    // de productos no perteneciendo a la organización.
    //
  }
}
