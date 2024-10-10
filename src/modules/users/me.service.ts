// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/sequelize";
// import { User } from "./models";
// import { Reciep } from "modules/reciep";

// @Injectable()
// export class MeService {
//     constructor(@InjectModel(User) private userModel: typeof User) { }

//     async getMe(userId: number) : Promise<any> {
//         return await this.userModel.findByPk(userId, {include: [Reciep]})
//     }
// }
