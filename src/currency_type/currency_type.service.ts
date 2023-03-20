import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { CurrencyType } from './schemas/currency_type.model';

@Injectable()
export class CurrencyTypeService {
  constructor(
    @InjectModel(CurrencyType)
    private readonly currencyTypeRepository: typeof CurrencyType,
  ) {}

  async createCurrencyType(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    const { name } = createCurrencyTypeDto;
    await this.findCurrencyTypeByName(name);

    const currencyType = await this.currencyTypeRepository.create(
      createCurrencyTypeDto,
    );

    return currencyType;
  }

  async findAllCurrencyTypes() {
    const currencyTypes = await this.currencyTypeRepository.findAll();

    return currencyTypes;
  }

  async findOneCurrentTypeById(id: number) {
    const currencyType = await this.currencyTypeRepository.findByPk(id);

    if (!currencyType) {
      throw new NotFoundException(`ID ${id}-ga teng valyuta mavjud emas`);
    }

    return currencyType;
  }

  async updateCurrencyTypeById(
    id: number,
    updateCurrencyTypeDto: UpdateCurrencyTypeDto,
  ) {
    await this.findOneCurrentTypeById(id);

    const updatedCurrencyType = await this.currencyTypeRepository.update(
      updateCurrencyTypeDto,
      { where: { id } },
    );

    return updatedCurrencyType;
  }

  async deleteCurrencyTypeById(id: number) {
    await this.findOneCurrentTypeById(id);
    await this.currencyTypeRepository.destroy({ where: { id } });

    return {
      message: `ID ${id}-ga teng bo'lgan valyuta turi o'chirib yuborildi`,
    };
  }

  private async findCurrencyTypeByName(name: string) {
    const currencyType = await this.currencyTypeRepository.findOne({
      where: { name },
    });

    if (currencyType) {
      throw new ForbiddenException('Bu turdagi valyuta mavjud');
    }
  }
}
