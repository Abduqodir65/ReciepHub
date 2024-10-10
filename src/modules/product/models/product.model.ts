import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'product' })
export class Product extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
}
