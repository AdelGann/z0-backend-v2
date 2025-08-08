import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/common/db/db.service';
import {
  CreateOrderInput,
  CreateOrderItems,
  SearchOrdersInput,
  SearchProductInput,
  UpdateOrderStatusInput,
} from './inputs/orders.input';

@Injectable()
export class OrdersService {
  constructor(private readonly dbService: DbService) {}

  async getAll(params?: SearchOrdersInput) {
    return this.dbService.orders.findMany({
      where: {
        ...(params && params),
      },
    });
  }

  // TODO: Probar bien, no estoy seguro de que funcione
  async getAllProducts(params: SearchProductInput) {
    const order_items = await this.dbService.order_items.findFirst({
      where: {
        order_id: params.order_id,
      },
      include: {
        products: true,
      },
    });

    if (!order_items || !order_items.products) {
      return null;
    }

    return order_items;
  }

  // Servicio para generar una orden
  async create(data: CreateOrderInput) {
    const order = await this.dbService.orders.create({
      data: {
        ...data,
      },
    });

    return order;
  }

  // Servicio para asignar productos a una orden
  async createItems(data: CreateOrderItems) {
    const { id, order_items } = data;
    const order = await this.dbService.orders.findFirst({
      where: {
        id,
      },
    });

    if (order === null) {
      throw new NotFoundException('Order not found');
    }

    for (let i = 0; i < order_items.length; i++) {
      const order_item = order_items[i];
      const products = await this.dbService.products.findFirst({
        where: {
          id: order_item.product_id,
        },
      });
      if (products === null) {
        throw new NotFoundException('Product not found');
      }

      const final_quantity = products.quantity - BigInt(order_item.quantity);

      if (final_quantity < 0) {
        throw new NotFoundException('Not enough quantity');
      }
      await this.dbService.products.update({
        where: {
          id: products.id,
        },
        data: {
          quantity: final_quantity,
        },
      });
    }
    return await this.dbService.order_items.createMany({
      data: order_items.map((item) => ({
        ...item,
        order_id: order.id,
      })),
      skipDuplicates: true,
    });
  }

  async updateStatus(data: UpdateOrderStatusInput) {
    const { id, payment_status } = data;

    const order = await this.dbService.orders.update({
      where: {
        id,
      },
      data: {
        payment_status,
      },
    });

    if (order === null) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
