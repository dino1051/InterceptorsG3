import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export class Customer {
  @ApiProperty({
    description: 'nombre del cliente',
    example: 'juan perez ',
  })
  name: string;

  @ApiProperty({
    description: 'correo electrónico del cliente',
    example: 'juan.perez@example.com',
  })
  email: string;
  @ApiHideProperty()
  passwordHash: string;
}

export class OrderItem {
  @ApiProperty({
    description: 'id del producto',
    example: 101,
  })
  productId: number;

  @ApiProperty({
    description: 'nombre del producto',
    example: 'teclado mecanico',
  })
  productName: string;

  @ApiProperty({
    description: 'cantidad del producto',
    example: 3,
  })
  quantity: number;

  @ApiProperty({
    description: 'precio unitario del producto',
    example: 89.9,
  })
  unitPrice: number;
}

export class PaymentInfo {
  @ApiProperty({
    description: 'numero de tarjeta enmascarado',
    example: '**** **** **** 4242',
  })
  creditCard: string;
  @ApiHideProperty()
  clientSecret: string;
}

export class Order {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Información del cliente',
    type: Customer,
  })
  customer: Customer;

  @ApiProperty({
    description: 'Productos incluidos en el pedido',
    type: [OrderItem],
  })
  items: OrderItem[];

  @ApiProperty({
    description: 'Total del pedido',
    example: 139.9,
  })
  total: number;

  @ApiProperty({
    description: 'Estado actual del pedido',
    enum: OrderStatus,
    example: OrderStatus.PAID,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Información del pago',
    type: PaymentInfo,
  })
  payment: PaymentInfo;

  @ApiProperty({
    description: 'Fecha de creación del pedido',
    example: '2026-09-01T10:15:00.000Z',
  })
  createdAt: Date;
}
