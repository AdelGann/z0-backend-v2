import { Injectable } from '@nestjs/common';
import {
  CreateDebtInput,
  SearchParamsInput,
  UpdateDebtStatusInput,
} from './inputs/debts.input';
import { DbService } from 'src/common/db/db.service';

@Injectable()
export class DebtsService {
  constructor(private readonly dbService: DbService) {}

  getAll(params: SearchParamsInput) {
    return this.dbService.debts.findMany({
      where: {
        ...params,
      },
    });
  }
  create(org_id: string, values: CreateDebtInput) {
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
  updateStatus(values: UpdateDebtStatusInput) {
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
