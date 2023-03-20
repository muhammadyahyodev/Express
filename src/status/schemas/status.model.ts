import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface CreationStatusAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, CreationStatusAttrs> {
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
