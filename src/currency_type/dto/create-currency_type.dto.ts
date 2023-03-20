import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyTypeDto {
  @ApiProperty({ example: 'Jarayonda' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Jarayon - bu boshlangan, lekin hali tugatilmagan ishdir!',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
