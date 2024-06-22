import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { UserDto } from 'src/users/dtos/user.dto';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart.' })
  @Post()
  async addToCart(
    @User() user: UserDto,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addToCart(
      user,
      createCartItemDto.productId,
      createCartItemDto.quantity,
    );
  }

  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart.' })
  @Delete(':productId')
  async removeFromCart(
    @User() user: UserDto,
    @Param('productId') productId: string,
    @Query('quantity') quantity: string,
  ) {
    const parsedQuantity = parseInt(quantity, 10);
    return this.cartService.removeFromCart(user, productId, parsedQuantity);
  }

  @ApiOperation({ summary: 'View cart' })
  @ApiResponse({ status: 200, description: 'Cart details retrieved.' })
  @Get()
  async viewCart(@User() user: UserDto) {
    return this.cartService.viewCart(user);
  }

  @ApiOperation({ summary: 'Checkout cart' })
  @ApiResponse({ status: 200, description: 'Cart checked out.' })
  @Post('checkout')
  async checkout(@User() user: UserDto) {
    await this.cartService.checkout(user);
  }
}
