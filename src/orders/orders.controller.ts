import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidateMember } from 'src/employees/decorators/member.decorator';
import { OrdersService } from './orders.service';
import {
  CreateOrderInput,
  CreateOrderItems,
  SearchOrdersInput,
  SearchProductInput,
  UpdateOrderStatusInput,
} from './inputs/orders.input';

@Auth()
@ValidateMember()
@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Get all orders',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders',
    type: String,
  })
  getAll(@Query() params: SearchOrdersInput) {
    return this.ordersService.getAll(params);
  }

  @Get('items')
  @ApiOperation({
    summary: 'Get all order items',
    description: 'Get all order items',
  })
  @ApiResponse({
    status: 200,
    description: 'Order items',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
    type: String,
  })
  getAllItems(@Query() params: SearchProductInput) {
    return this.ordersService.getAllProducts(params);
  }

  @Post()
  @ApiOperation({
    summary: 'Create order',
    description: 'Create order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order created',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Order not created',
    type: String,
  })
  createOrder(@Body() data: CreateOrderInput) {
    return this.ordersService.create(data);
  }

  @Post('items')
  @ApiOperation({
    summary: 'Create order items',
    description: 'Create order items',
  })
  @ApiResponse({
    status: 200,
    description: 'Order items created',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Order items not created',
    type: String,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
    type: String,
  })
  @ApiResponse({
    status: 409,
    description: 'Order items already created',
    type: String,
  })
  createItems(@Body() data: CreateOrderItems) {
    return this.ordersService.createItems(data);
  }

  @Patch('status')
  @ApiOperation({
    summary: 'Update order status',
    description: 'Update order status',
  })
  @ApiResponse({
    status: 200,
    description: 'Order updated',
    type: String,
  })
  updateOrderStatus(@Body() data: UpdateOrderStatusInput) {
    return this.ordersService.updateStatus(data);
  }
}
