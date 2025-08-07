import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import {
  CreateProductDto,
  SearchProductDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DbService) {}

  async getAll(params: SearchProductDto) {
    if (!params.org_id) {
      throw new BadRequestException('Organization not provided');
    }
    return this.db.products.findMany({
      where: {
        org_id: params.org_id,
        name: params?.name || undefined,
        code: params?.code || undefined,
        ...(params?.avalaible && {
          quantity: {
            gt: 0,
          },
        }),
      },
    });
  }

  async create(org_id: string, data: CreateProductDto) {
    return this.db.products.create({
      data: {
        ...data,
        org_id,
        created_at: new Date(),
        update_at: new Date(),
      },
    });
  }

  async update(org_id: string, data: UpdateProductDto) {
    const { id, code, ...rest } = data;
    const product = await this.db.products.findUnique({
      where: {
        org_id_id_code: {
          org_id,
          id,
          code: code,
        },
      },
    });
    if (product === null) {
      throw new NotFoundException('Product not founded');
    }
    return this.db.products.update({
      where: {
        org_id_id: {
          org_id: product.org_id,
          id: product.id,
        },
      },
      data: {
        ...rest,
        update_at: new Date(),
      },
    });
  }

  async delete(org_id: string, id: string) {
    const product = await this.db.products.findUnique({
      where: {
        org_id_id: {
          org_id,
          id,
        },
      },
    });
    if (product === null) {
      throw new NotFoundException('Product not founded');
    }
    return this.db.products.delete({
      where: {
        org_id: product.org_id,
        id: product.id,
      },
    });
  }
}
