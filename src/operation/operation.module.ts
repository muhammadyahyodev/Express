import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './schemas/operation.model';
import { Admin } from 'src/admin/schemas/admin.model';
import { Status } from 'src/status/schemas/status.model';
import { Order } from 'src/order/schemas/order.model';

@Module({
  imports: [SequelizeModule.forFeature([Operation, Admin, Status, Order])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
