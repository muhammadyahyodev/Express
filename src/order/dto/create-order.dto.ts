import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  summa: number;

  @IsNotEmpty()
  @IsNumber()
  currency_type_id: number;

  @IsNotEmpty()
  @IsString()
  truck: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
