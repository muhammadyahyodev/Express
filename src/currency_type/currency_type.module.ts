import { Module } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CurrencyTypeController } from './currency_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyType } from './schemas/currency_type.model';

@Module({
  imports: [SequelizeModule.forFeature([CurrencyType])],
  controllers: [CurrencyTypeController],
  providers: [CurrencyTypeService],
})
export class CurrencyTypeModule {}
