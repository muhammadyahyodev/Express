import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreationCurrencyTypeAttrs {
  readonly name: string;
  readonly description: string;
}

@Table({ tableName: 'currency_type' })
export class CurrencyType extends Model<
  CurrencyType,
  CreationCurrencyTypeAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;
}
