import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "src/database/entity/user.entity";
import { userController } from "../Controler/user.controller";
import { UsersService } from "./user.sevice";
import { authService } from "./auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([userEntity])],
    controllers: [userController],
    providers: [UsersService,authService],
    exports : [UsersService]
  })
  export class userModule {}
  