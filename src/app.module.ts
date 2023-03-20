import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './status/schemas/status.model';
import { StatusModule } from './status/status.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/schemas/admin.model';
import { CurrencyTypeModule } from './currency_type/currency_type.module';
import { OrderModule } from './order/order.module';
import { CurrencyType } from './currency_type/schemas/currency_type.model';
import { Order } from './order/schemas/order.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Status, Admin, CurrencyType, Order],
      autoLoadModels: true,
      logging: false,
    }),
    StatusModule,
    AdminModule,
    CurrencyTypeModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
