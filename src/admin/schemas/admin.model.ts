import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreationAdminAttrs {
  full_name: string;
  username: string;
  hashed_password: string;
  phone_number: string;
  email: string;
  tg_link: string;
  hashed_token: string;
  is_active: boolean;
  description: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, CreationAdminAttrs> {
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
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  hashed_token: string;
}
