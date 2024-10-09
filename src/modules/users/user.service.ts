import { Injectable } from "@nestjs/common";
import { User } from "./models";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserRequest, UpdateUserRequest } from "./interfaces";
import { FileService } from "modules/file";
import { CreateUserDto } from "./dtos";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, private readonly fileService: FileService) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: { id },
        });
    }

    async createUser(payload:CreateUserDto, file:Express.Multer.File): Promise<{ message:string; new_user: User }> {
        const image = await this.fileService.uploadFile(file)

        const new_user = await this.userModel.create({
            name: payload.name,
            username: payload.username,
            age: payload.age,
            gender: payload.gender,
            email: payload.email,
            password:payload.password,
            role: payload.role,
            image
        })

        return { message: 'User created successfully', new_user}
    }

    async updateUser(id: number, payload: UpdateUserRequest): Promise<{ message: string; updatedUser: User }> {
        await this.userModel.update(payload, {
            where: { id },
        });
        const updatedUser = await this.userModel.findOne({ where: { id } });
        return { message: 'User updated successfully', updatedUser };
    }

    async deleteUser(id: number): Promise<{message:string}>{
        const foundedUser = await this.userModel.findByPk(id)

        await this.fileService.deleteFile(foundedUser.image)
        foundedUser.destroy()
        
        return {
            message: "User deleted successfully"
        }
    }


}
