import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../service/user.sevice";

@Injectable()
export class CurrentMiddleware implements NestMiddleware{

    constructor(private userService : UsersService) { }
    
    async use(req: any, res: any, next: (error?: Error | any) => void) {
        const {userID} = req.session
        if(userID){
            const currentUser = await this.userService.findOne(userID)
            req.currentUser = currentUser
        }

        next()
    }
    
}
  