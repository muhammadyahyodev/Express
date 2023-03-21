import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './schemas/order.model';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: `Yangi buyurtma qo'shish` })
  @ApiResponse({ status: 200, type: [Order] })
  // @ApiBearerAuth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Barcha buyurtmalarni qaytarish' })
  @ApiResponse({ status: 200, type: [Order] })
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({ summary: `Bitta buyurtmani ID orqali qaytarish` })
  @ApiResponse({ status: 200, type: [Order] })
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrderById(+id);
  }

  @ApiOperation({ summary: 'ID orqali bitta buyurtmani tahrirlash' })
  @ApiResponse({ status: 200, type: [Order] })
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrderById(+id, updateOrderDto);
  }

  @ApiOperation({ summary: `ID orqali bitta buyurtmani o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [Order] })
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrderById(+id);
  }
}
