import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import {
  CreateIncomeDto,
  SearchParamsDto,
  UpdateIncomeStatusDto,
} from './dto/incomes.dto';

@Injectable()
export class IncomesService {
  constructor(private readonly dbService: DbService) {}

  getAll(params: SearchParamsDto) {
    return this.dbService.incomes.findMany({
      where: {
        ...params,
      },
    });
  }
  create(org_id: string, values: CreateIncomeDto) {
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
  updateStatus(values: UpdateIncomeStatusDto) {
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
