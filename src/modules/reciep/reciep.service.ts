import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reciep } from './models';
import { CreateReciepDto, UpdateReciepDto } from './dtos';

@Injectable()
export class ReciepService {
  constructor(@InjectModel(Reciep) private reciepModel: typeof Reciep) {}

  async getAllRecieps(): Promise<Reciep[]> {
    return await this.reciepModel.findAll();
  }

  async getReciepById(id: number): Promise<Reciep> {
    return await this.reciepModel.findOne({
      where: { id },
    });
  }

  async createReciep(
    payload: CreateReciepDto,
  ): Promise<{ message: string; new_reciep: Reciep }> {
    const new_reciep = await this.reciepModel.create({
      quantity: payload.quantity,
      product_id: payload.product_id,
      meal_id: payload.meal_id,
    });

    return { message: 'Reciep created successfully', new_reciep };
  }

  async updateReciep(
    id: number,
    payload: UpdateReciepDto,
  ): Promise<{ message: string; updatedReciep: Reciep }> {
    await this.reciepModel.update(payload, {
      where: { id },
    });
    const updatedReciep = await this.reciepModel.findOne({ where: { id } });
    return { message: 'User updated successfully', updatedReciep };
  }

  async deleteReciep(id: number): Promise<{ message: string }> {
    await this.reciepModel.destroy({
      where: { id },
    });

    return {
      message: 'Reciep deleted successfully',
    };
  }
}
