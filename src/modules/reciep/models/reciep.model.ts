import { Category } from 'modules/category';
import { User } from 'modules/users';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';


@Table({ timestamps: true, tableName: 'reciep' })
export class Reciep extends Model {
    @Column({ allowNull: false, type: DataType.STRING, unique: true })
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

    @BelongsTo(() => Category)
    category: Category

    @BelongsTo(() => User)
    user: User
}
