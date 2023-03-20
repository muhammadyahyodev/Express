import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Operation } from './schemas/operation.model';

@ApiTags('Operation')
@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @ApiOperation({ summary: 'Yangi amaliyot yaratish' })
  @ApiResponse({ status: 200, type: [Operation] })
  // @ApiBearerAuth()
  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.createOperation(createOperationDto);
  }

  @ApiOperation({ summary: 'Barcha amaliyotlarni qaytarish' })
  @ApiResponse({ status: 200, type: [Operation] })
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.operationService.findAllOperations();
  }

  @ApiOperation({ summary: 'ID orqali bitta amaliyotni qaytarish' })
  @ApiResponse({ status: 200, type: [Operation] })
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOneOperationById(+id);
  }

  @ApiOperation({ summary: 'ID orqali bitta amaliyotni tahrirlash' })
  @ApiResponse({ status: 200, type: [Operation] })
  // @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationService.updateOperationById(+id, updateOperationDto);
  }

  @ApiOperation({ summary: `ID orqali bitta amaliyotni o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [Operation] })
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.deleteOperationById(+id);
  }
}
