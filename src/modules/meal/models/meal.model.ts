import { Category } from 'modules/category';
import { User } from 'modules/users';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';


@Table({ timestamps: true, tableName: 'meal' })
export class Meal extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    description: string;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

    @Column({ type: DataType.STRING, allowNull: false })
    video: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    user_id: number;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    category_id: number

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Category)
    category: Category
}
