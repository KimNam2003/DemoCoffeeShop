import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Session } from "@nestjs/common";
import { UsersService } from "../service/user.sevice";
import { CreateUserDto } from "../DTO/create-user.dto";
import { UpdateUserDto } from "../DTO/update-user.dto";
import { accountDTO } from "../DTO/account.dto";
import { authService } from "../service/auth.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { userEntity } from "src/database/entity/user.entity";
import { request } from "http";
@Controller('user')
export class userController{
    constructor(
        private userService : UsersService,
        private authService : authService
    ){}
@Get()
findAll()  {
    return this.userService.findAll()
}
@Get(':id')
findOne(@Param('id') id :string ) {
    return this.userService.findOne(+id)
}

@Delete(":id")
async deleteUser(@Param('id') id : string) {
    return await this.userService.delete(+id)
}
@Put(":id")
async updateUser(@Param("id",ParseIntPipe) id: number , @Body() updateUser :UpdateUserDto) {
 return await this.userService.updateUser(id,updateUser)
}
@Post()
 async createUser(@Body() newUser :CreateUserDto) {
    return await this.userService.createUser(newUser)
}
@Post('sign-up')
async signUp(@Body() createAccount: CreateUserDto) {
  return await this.authService.signUp(createAccount);
}
@Post('sign-in')
async signIn(
    @Body() body: accountDTO,
    @Session() session: Record<string, any>,
) {
    const user = await this.authService.sign_in(body.email, body.password);
   session.userID =user.id
   return `login sucessualy with `
}
}
