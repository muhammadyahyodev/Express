import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './schemas/status.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: `Yangi admin yaratish` })
  @ApiResponse({ status: 200, type: [Status] })
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createStatus(createStatusDto);
  }

  @ApiOperation({ summary: `Barcha admin'larni qaytarish` })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  findAll() {
    return this.statusService.findAllStatuses();
  }

  @ApiOperation({ summary: `ID orqali bitta admin'ni qaytarish` })
  @ApiResponse({ status: 200, type: [Status] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOneStatusById(+id);
  }

  @ApiOperation({ summary: `Bitta admin'ni ID orqali tahririlash` })
  @ApiResponse({ status: 200, type: [Status] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatusById(+id, updateStatusDto);
  }

  @ApiOperation({ summary: `Biita admin'ni ID orqali o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [Status] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.deleteStatusById(+id);
  }
}
