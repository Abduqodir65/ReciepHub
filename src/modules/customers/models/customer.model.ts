import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum CustomerRoles {
    user = "customer",
    admin = "admin"
}

export enum CustomerGen {
    male = "male",
    female = "female"
}




@Table({ timestamps: true, tableName: 'customers' })
export class Customer extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING})
    username: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @Column({ type: DataType.ENUM,values: [CustomerGen.male, CustomerGen.female], allowNull:false,defaultValue:CustomerGen})
    gender: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    email: string;

    @Column({ type: DataType.ENUM,values: [CustomerRoles.user, CustomerRoles.admin], allowNull:false,defaultValue:CustomerRoles})
    role: CustomerRoles;
    
    @Column({ type: DataType.STRING, allowNull: false })
    image: string;

}
