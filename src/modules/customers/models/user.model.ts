import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum UserRoles {
    user = "customer",
    admin = "admin"
}

export enum UserGen {
    male = "male",
    female = "female"
}


@Table({ timestamps: true, tableName: 'users' })
export class User extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING})
    username: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @Column({ type: DataType.ENUM,values: [UserGen.male, UserGen.female], allowNull:false,defaultValue:UserGen})
    gender: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    email: string;

    @Column({ type: DataType.ENUM,values: [UserRoles.user, UserRoles.admin], allowNull:false,defaultValue:UserRoles})
    role: UserRoles;
    
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

}
