import { PartialType } from '@nestjs/swagger';
import { CreateCurrencyTypeDto } from './create-currency_type.dto';

export class UpdateCurrencyTypeDto extends PartialType(CreateCurrencyTypeDto) {}
