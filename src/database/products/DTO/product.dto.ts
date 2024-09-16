import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class productDTO{
    @IsString()
     name : string 

     @Type(() => Number)
     @IsNumber()
     @Min(0)
     quantity: number;
   
     @Type(() => Number)
     @IsNumber()
     @Min(0)
     @IsOptional()
     quantitySold: number;
   
     @Type(() => Number)
     @IsNumber()
     @Min(0)
     price: number;

    @IsString()
    description : string


}