import { NOW } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Admin } from 'src/admin/schemas/admin.model';
import { Order } from 'src/order/schemas/order.model';
import { Status } from 'src/status/schemas/status.model';

interface CreationOperationAttrs {
  readonly order_unique_id: string;
  readonly status_id: number;
  readonly operation_date: string;
  readonly admin_id: number;
  readonly description: string;
}

@Table({ tableName: 'operation' })
export class Operation extends Model<Operation, CreationOperationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: NOW(),
  })
  operation_date: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  admin_id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  description: string;
}
