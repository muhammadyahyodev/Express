import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './schemas/status.model';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusRepository: typeof Status,
  ) {}

  async createStatus(createStatusDto: CreateStatusDto) {
    const { name, description } = createStatusDto;
    await this.findOneStatusByName(name);

    const status = await this.statusRepository.create({ name, description });

    return status;
  }

  async findAllStatuses() {
    const statuses = await this.statusRepository.findAll({});
    return statuses;
  }

  async findOneStatusById(id: number) {
    const status = await this.statusRepository.findByPk(id);

    if (!status) {
      throw new NotFoundException('Bunday status mavjud emas');
    }

    return status;
  }

  async updateStatusById(id: number, updateStatusDto: UpdateStatusDto) {
    await this.findOneStatusById(id);

    const { name, description } = updateStatusDto;

    const updatedStatus = await this.statusRepository.update(
      {
        name,
        description,
      },
      { where: { id }, returning: true },
    );

    return updatedStatus;
  }

  async deleteStatusById(id: number) {
    await this.findOneStatusById(id);
    await this.statusRepository.destroy({ where: { id } });

    return { message: `ID ${id}-teng bo'lgan status o'chirib yuborildi!` };
  }

  async findOneStatusByName(name: string) {
    const status = await this.statusRepository.findOne({ where: { name } });

    if (status) {
      throw new ForbiddenException('Bu nomdagi status mavjud');
    }
  }
}
