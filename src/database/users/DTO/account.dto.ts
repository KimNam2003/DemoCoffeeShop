import { IsEmail, IsString } from "class-validator"

export class accountDTO {
    @IsEmail()
    email: string

    @IsString()
    password : string
}