import { Injectable } from '@nestjs/common';
import {
  CreateDebtDto,
  SearchParamsDto,
  UpdateDebtStatusDto,
} from './dto/debts.dto';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class DebtsService {
  constructor(private readonly dbService: DbService) {}

  getAll(params: SearchParamsDto) {
    return this.dbService.debts.findMany({
      where: {
        ...params,
      },
    });
  }
  create(org_id: string, values: CreateDebtDto) {
    const { employee_id, ...rest } = values;
    return this.dbService.debts.create({
      data: {
        org_id,
        ...rest,
        ...(employee_id && {
          employee_id,
        }),
      },
    });
  }
  updateStatus(values: UpdateDebtStatusDto) {
    return this.dbService.debts.update({
      where: {
        id: values.id,
      },
      data: {
        status: values.status,
      },
    });
  }
}
