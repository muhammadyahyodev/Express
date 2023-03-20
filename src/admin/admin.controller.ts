import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthAdminDto } from './dto/signin-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.model';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: `Ro'yhatdan o'tish` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Post('signup')
  signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signUp(createAdminDto, res);
  }

  @ApiOperation({ summary: `Tizimga kirish` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Post('signin')
  signIn(
    @Body() authAdminDto: AuthAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(authAdminDto, res);
  }

  @ApiOperation({ summary: `Barcha adminlarni qaytarish` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.adminService.findAllAdmins();
  }

  @ApiOperation({ summary: `Bitta admin'ni ID orqali qaytarish` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneAdminById(+id);
  }

  @ApiOperation({ summary: `ID orqali admin'ni tahrirlash` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdminById(+id, updateAdminDto);
  }

  @ApiOperation({ summary: `ID orqali admin'ni o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [Admin] })
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.deleteOneAdminById(+id);
  }
}
