import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import {
  CreateIncomeInput,
  SearchParamsInput,
  UpdateIncomeStatusInput,
} from './inputs/incomes.input';

@Injectable()
export class IncomesService {
  constructor(private readonly dbService: DbService) {}

  getAll(params: SearchParamsInput) {
    return this.dbService.incomes.findMany({
      where: {
        ...params,
      },
    });
  }
  create(org_id: string, values: CreateIncomeInput) {
    const { employee_id, ...rest } = values;
    return this.dbService.incomes.create({
      data: {
        org_id,
        ...rest,
        ...(employee_id && {
          employee_id,
        }),
      },
    });
  }
  updateStatus(values: UpdateIncomeStatusInput) {
    return this.dbService.incomes.update({
      where: {
        id: values.id,
      },
      data: {
        status: values.status,
      },
    });
  }
}
