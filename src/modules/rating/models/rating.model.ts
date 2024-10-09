import { Reciep } from 'modules/reciep';
import { User } from 'modules/users';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';


@Table({ timestamps: true, tableName: 'rating' })
export class Rating extends Model {
    @Column({ allowNull: false, type: DataType.DECIMAL })
    rating: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    user_id: number;

    @ForeignKey(() => Reciep)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    reciep_id: number;

    @BelongsTo(() => User)
    user = User

    @BelongsTo(() => Reciep)
    reciep = Reciep

}
