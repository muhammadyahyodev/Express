import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminService } from './admin.service';
import { ActivateDto } from './dto/activate.dto';
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
  @ApiBearerAuth()
  @Post('signup')
  signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signUp(createAdminDto, res);
  }

  @ApiOperation({ summary: `Tizimga kirish` })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('signin')
  signIn(
    @Body() authAdminDto: AuthAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(authAdminDto, res);
  }

  @ApiOperation({ summary: 'Tizimdan chiqish' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminService.logout(req, res);
  }

  @ApiOperation({ summary: `Access va Refresh tokenlarni qaytarish` })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('refreshtoken')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminService.refreshToken(req, res);
  }

  @ApiOperation({ summary: 'Admin holatini aktivlashtirish' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('activate')
  activate(@Body() activateDto: ActivateDto) {
    return this.adminService.activation(activateDto);
  }

  // @ApiOperation({ summary: 'Admin creator lavozimini aktivlashtirish' })
  // @ApiResponse({ status: 200, type: [Admin] })
  // @Post('creator_active')
  // activateCreator(@Body() activateDto: ActivateDto) {
  //   return this.adminService.activateCreator(activateDto);
  // }

  @ApiOperation({ summary: `Barcha adminlarni qaytarish` })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreateAdminDto)
  @Get()
  findAll() {
    return this.adminService.findAllAdmins();
  }

  @ApiOperation({ summary: `Bitta admin'ni ID orqali qaytarish` })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreateAdminDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneAdminById(+id);
  }

  @ApiOperation({ summary: `ID orqali admin'ni tahrirlash` })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdminById(+id, updateAdminDto);
  }

  @ApiOperation({ summary: `ID orqali admin'ni o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreateAdminDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.deleteOneAdminById(+id);
  }
}
