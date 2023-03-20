import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './schemas/operation.model';
import { Admin } from 'src/admin/schemas/admin.model';
import { Status } from 'src/status/schemas/status.model';

@Module({
  imports: [SequelizeModule.forFeature([Operation, Admin, Status])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
