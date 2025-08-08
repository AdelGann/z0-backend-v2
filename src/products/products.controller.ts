import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidateMember } from 'src/employees/decorators/member.decorator';
import { MemberRoles } from 'src/employees/decorators/role.decorator';
import { ProductsService } from './products.service';
import {
  CreateProductInput,
  SearchProductInput,
  UpdateProductInput,
} from './inputs/product.input';
import { Roles } from 'generated/prisma';

@ApiTags('Products')
@Controller('products')
@Auth()
@ValidateMember()
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  getAll(@Query(`search`) params: SearchProductInput) {
    return this.productsService.getAll(params);
  }

  @Post()
  @ApiOperation({
    description: 'create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  @MemberRoles(Roles.ADMIN)
  create(@Query('org_id') org_id: string, @Body() body: CreateProductInput) {
    return this.productsService.create(org_id, body);
  }

  @Patch()
  @ApiOperation({
    description: 'Update a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  @MemberRoles(Roles.ADMIN)
  update(@Query('org_id') org_id: string, @Body() body: UpdateProductInput) {
    return this.productsService.update(org_id, body);
  }

  @Delete()
  @ApiOperation({
    description: 'Delete a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbbiden Resource',
  })
  @MemberRoles(Roles.ADMIN)
  delete(@Query('params') params: { org_id: string; product_id: string }) {
    return this.productsService.delete(params.org_id, params.product_id);
  }
}
