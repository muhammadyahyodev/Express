import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CurrencyType } from 'src/currency_type/schemas/currency_type.model';

interface CreationOrdersAttrs {
  readonly order_unique_id: string;
  readonly full_name: string;
  readonly phone_number: string;
  readonly product_link: string;
  readonly summa: number;
  readonly currency_type: number;
  readonly truck: string;
  readonly description: string;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, CreationOrdersAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  order_unique_id: string;

  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  product_link: string;

  @Column({
    type: DataType.DECIMAL,
  })
  summa: number;

  @ForeignKey(() => CurrencyType)
  @Column({
    type: DataType.INTEGER,
  })
  currency_type_id: number;

  @Column({
    type: DataType.STRING,
  })
  truck: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  description: string;
}
