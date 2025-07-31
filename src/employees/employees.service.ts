import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DbService) {}

  async getAll() {}
  async create(user_id: string, founder_id: string) {}
  async createMany() {}
  async remove() {}
}
