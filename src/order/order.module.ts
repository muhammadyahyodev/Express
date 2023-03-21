import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './schemas/order.model';
import { CurrencyType } from 'src/currency_type/schemas/currency_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, CurrencyType])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
