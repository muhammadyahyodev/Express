import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthAdminDto {
  @ApiProperty({ example: 'akmal' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'akmalPassword' })
  @IsNotEmpty()
  @IsString()
  hashed_password: string;
}
