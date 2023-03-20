import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Akmal Jo`rayev' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'akmal' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '+998902584708' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'akmal_password' })
  @IsNotEmpty()
  @IsString()
  hashed_password: string;

  @ApiProperty({ example: 'akmal@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'aankfkdanfsdandfanspngpaerongpierngwerig' })
  @IsNotEmpty()
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: 'Bu maydon qo`shimcha murojat yoki eslatmalar uchun',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
