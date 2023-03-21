import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOperationDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  status_id: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  admin_id: number;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({ example: `Bu maydon qo'shimcha ma'lumotlar uchun` })
  @IsString()
  description: string;
}
