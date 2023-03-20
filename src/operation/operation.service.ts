import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './schemas/operation.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation)
    private readonly operationRepository: typeof Operation,
  ) {}

  async createOperation(createOperationDto: CreateOperationDto) {
    const uniqueId = uuidv4();

    const operation = await this.operationRepository.create({
      ...createOperationDto,
      order_unique_id: uniqueId,
      operation_date: `${Date.now()}`,
    });

    return operation;
  }

  async findAllOperations() {
    const operations = await this.operationRepository.findAll();
    return operations;
  }

  async findOneOperationById(id: number) {
    const operation = await this.operationRepository.findByPk(id);

    if (!operation) {
      throw new NotFoundException(
        `ID ${id}'ga teng bo'lgan jarayon mavjud emas`,
      );
    }

    return operation;
  }

  async updateOperationById(
    id: number,
    updateOperationDto: UpdateOperationDto,
  ) {
    await this.findOneOperationById(id);

    const updatedOperation = await this.operationRepository.update(
      updateOperationDto,
      { where: { id }, returning: true },
    );

    return updatedOperation[1][0];
  }

  async deleteOperationById(id: number) {
    await this.findOneOperationById(id);
    await this.operationRepository.destroy({ where: { id } });

    return { message: `ID ${id}-ga teng bo'lgan jarayon mavjud emas` };
  }
}
