import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  product_link: string;

  @IsNotEmpty()
  @IsDecimal()
  summa: number;

  @IsNotEmpty()
  @IsNumber()
  currency_type: number;

  @IsNotEmpty()
  @IsString()
  truck: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
