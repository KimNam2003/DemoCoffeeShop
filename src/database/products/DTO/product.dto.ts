import { IsNumber, IsString } from "class-validator"

export class productDTO{
    @IsString()
     name : string 

     @IsNumber()
    price : number 

    @IsNumber()
    quality : number

    @IsNumber()
    qualitySold : number

    @IsString()
    description : string


}