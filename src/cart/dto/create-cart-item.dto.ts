import { IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ description: 'The ID of the product' })
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'The quantity of the product', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
