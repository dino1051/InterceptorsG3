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

// =============================================================================
// OrdersController
// -----------------------------------------------------------------------------
// El CRUD ya funciona. Aquí solo hay que agregar decoradores de Swagger
// (todos se importan desde '@nestjs/swagger').
//
// TODO [Estudiante 1 - Swagger]: describe QUÉ hace cada endpoint.
//   - @ApiTags('orders') sobre la clase, para agruparlos en Swagger UI.
//   - @ApiOperation({ summary: '...', description: '...' }) en cada método.
//   - @ApiParam({ name: 'id', description: '...', example: 1 }) en GET /orders/:id.
//
// TODO [Estudiante 3 - Swagger]: describe QUÉ puede responder cada endpoint.
//   - @ApiOkResponse({ type: Order }) / @ApiOkResponse({ type: [Order] })
//   - @ApiCreatedResponse({ type: Order }) en POST
//   - @ApiBadRequestResponse(...) en POST (falla la validación del DTO)
//   - @ApiNotFoundResponse(...) en GET /orders/:id
//   - @ApiRequestTimeoutResponse(...) en el reporte pesado (¡lo lanza tu interceptor!)
//
// Coordinen entre ustedes: ambos editan este archivo (hagan commits pequeños).
// =============================================================================

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOkResponse({ type: [Order] })
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Lista todas las ordenes',
    description:
      'Lista todas las ordenes que registradas y las muestra en un formato adecuado',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  // Esta ruta se declara ANTES de ':id' para que se lea de lo más específico
  // a lo más genérico.
  @Get('reports/heavy-process')
  @ApiTags('orders')
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
  @ApiTags('orders')
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
  @ApiTags('orders')
  @ApiOperation({
    summary: 'Crea una nueva orden',
    description: 'Crea una nueva orden',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
