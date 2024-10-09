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

    @Column({ allowNull: false, type: DataType.STRING ,unique:true})
    username: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @Column({ 
        type: DataType.ENUM, 
        values: [UserGen.male, UserGen.female], 
        allowNull: false, 
        defaultValue: UserGen.male
    })
    gender: string;

    @Column({ type: DataType.TEXT, allowNull: false ,unique:true})
    email: string;

    @Column({ type: DataType.TEXT, allowNull: false})
    password: string;

    @Column({ 
        type: DataType.ENUM, 
        values: [UserRoles.user, UserRoles.admin], 
        allowNull: false, 
        defaultValue: UserRoles.user 
    })
    role: UserRoles;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;
}
