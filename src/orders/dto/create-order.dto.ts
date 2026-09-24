import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    description: 'id del producto',
    example: 101,
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'nombre del producto',
    example: 'teclado mecanico',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    description: 'cantidad del producto',
    example: 3,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'precio unitario del producto',
    example: 89.9,
    minimum: 0,
  })
  @IsPositive()
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'juan perez',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@gmail.com',
  })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'Lista de productos del pedido',
    type: [OrderItemDto],
    example: [
      {
        productId: 101,
        productName: 'Teclado mecánico',
        quantity: 1,
        unitPrice: 89.9,
      },
    ],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'Número de tarjeta de crédito de 16 dígitos',
    example: '4111111111114242',
    pattern: '^\\d{16}$',
  })
  @Matches(/^\d{16}$/, {
    message: 'creditCard debe tener exactamente 16 dígitos numéricos',
  })
  creditCard: string;
}
