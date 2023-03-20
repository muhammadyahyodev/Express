import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrencyTypeService } from './currency_type.service';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { CurrencyType } from './schemas/currency_type.model';

@ApiTags('Currency Type')
@Controller('currency-type')
export class CurrencyTypeController {
  constructor(private readonly currencyTypeService: CurrencyTypeService) {}

  @ApiOperation({ summary: `Yangi valyuta turi qo'shish` })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  // @ApiBearerAuth()
  @Post()
  create(@Body() createCurrencyTypeDto: CreateCurrencyTypeDto) {
    return this.currencyTypeService.createCurrencyType(createCurrencyTypeDto);
  }

  @ApiOperation({ summary: `Barcha valyuta turlarini qaytarish` })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  // @ApiBearerAuth()
  @Get()
  findAll() {
    return this.currencyTypeService.findAllCurrencyTypes();
  }

  @ApiOperation({ summary: `ID orqali valyuta turini qaytarish` })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyTypeService.findOneCurrentTypeById(+id);
  }

  @ApiOperation({ summary: `ID orqali valyuta turini tahrirlash` })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  // @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyTypeDto: UpdateCurrencyTypeDto,
  ) {
    return this.currencyTypeService.updateCurrencyTypeById(
      +id,
      updateCurrencyTypeDto,
    );
  }

  @ApiOperation({ summary: `ID orqali valyuta turini o'chirib yuborish` })
  @ApiResponse({ status: 200, type: [CurrencyType] })
  // @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyTypeService.deleteCurrencyTypeById(+id);
  }
}
