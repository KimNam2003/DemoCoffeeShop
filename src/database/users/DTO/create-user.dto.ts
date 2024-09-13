import { Exclude } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
  
    role?: string;

    @IsString()
    password: string;
  
    @IsString()
    name: string;
  
    favoriteTheme?: string;
}


