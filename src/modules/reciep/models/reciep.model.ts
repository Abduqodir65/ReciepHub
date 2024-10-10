import { Meal } from 'modules/meal/models';
import { Product } from 'modules/product';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'reciep' })
export class Reciep extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  quantity: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  product_id: number;

  @ForeignKey(() => Meal)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  meal_id: number;

  @BelongsTo(() => Meal)
  meal: Meal;

  @BelongsTo(() => Product)
  product: Product;
}
