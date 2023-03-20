import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);

    return order;
  }

  async findAllOrders() {
    const orders = await this.orderRepository.findAll();

    return orders;
  }

  async findOneOrderById(id: number) {
    const order = await this.orderRepository.findByPk(id);

    if (!order) {
      throw new NotFoundException(
        `ID ${id}-ga teng bo'lgan buyurtma mavjud emas`,
      );
    }

    return order;
  }

  async updateOrderById(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOneOrderById(id);

    const updatedOrder = await this.orderRepository.update(updateOrderDto, {
      where: { id },
      returning: true,
    });

    return updatedOrder;
  }

  async deleteOrderById(id: number) {
    await this.findOneOrderById(id);
    await this.orderRepository.destroy({ where: { id } });

    return { message: `ID ${id}-ga teng bo'lgan buyurtma o'chirib yuborildi` };
  }
}
