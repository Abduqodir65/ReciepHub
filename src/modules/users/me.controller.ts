// import { Controller,Request } from "@nestjs/common";
// import { MeService } from "./me.service";
// import { Protected, Roles } from "decorators";
// import { UserRoles } from "./models";
// import { RequestInterface } from "guards";

// @Controller("me")
// export class MeController {
//     constructor(private readonly service:MeService) { }

//     @Protected(true)
//     @Roles([UserRoles.user, UserRoles.admin])
//     async getMe(@Request() request: RequestInterface) : Promise<any> {
//         return await this.service.getMe(request.userId)
//     }
// }
