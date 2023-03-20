import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'Jarayonda' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
