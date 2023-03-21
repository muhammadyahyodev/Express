import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateDto {
  @ApiProperty({ example: 'false' })
  @IsNotEmpty()
  @IsBoolean()
  value: boolean;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
