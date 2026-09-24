import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiRequestTimeoutResponse,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOkResponse({ type: [Order] })
  @ApiOperation({
    summary: 'Lista todas las ordenes',
    description:
      'Lista todas las ordenes que registradas y las muestra en un formato adecuado',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('reports/heavy-process')
  @ApiOperation({
    summary: 'Proceso pesado de ordenes',
    description: 'Proceso pesado de ordenes',
  })
  @ApiRequestTimeoutResponse()
  generateHeavyReport() {
    return this.ordersService.generateHeavyReport();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Order })
  @ApiOperation({
    summary: 'Lista una orden por su id',
    description: 'Lista una orden por su id',
  })
  @ApiParam({
    name: 'id',
    description: 'Lista una orden por su id',
    example: 1,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse()
  @ApiOperation({
    summary: 'Crea una nueva orden',
    description: 'Crea una nueva orden',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
