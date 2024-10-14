import { Category } from "modules/category";
import { User } from "modules/users";
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({ timestamps: true, tableName: 'meal' })
export class Meal extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    name: string

    @Column({ allowNull: false, type: DataType.STRING })
    description: string

    @Column({ allowNull: false, type: DataType.STRING })
    image: string

    @Column({ allowNull: false, type: DataType.STRING })
    video: string

    @ForeignKey(() => Category)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    category_id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
    })
    user_id: number;

    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => User)
    user: User


}