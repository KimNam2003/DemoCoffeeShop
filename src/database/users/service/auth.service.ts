import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { userEntity } from "src/database/entity/user.entity";
import { Repository } from "typeorm";
import { accountDTO } from "../DTO/account.dto";
import { CreateUserDto } from "../DTO/create-user.dto";
import * as bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";

@Injectable()
export class authService  {
   constructor(
    @InjectRepository( userEntity)
    private AuthReponsitory : Repository<userEntity>
   ) {}

   
   async signUp(createUser: CreateUserDto) {
    const isExist = await this.AuthReponsitory.existsBy({
      email: createUser.email,
    });
    if (isExist) {
      throw  new BadRequestException('User already exists');
      } else {
        const salt = await bcrypt.genSalt();
        console.log('salt',salt)
        console.log('Passwword', createUser.password)
        const password= await bcrypt.hash(createUser.password,salt)
        const newUser = await this.AuthReponsitory.save({
          ...createUser,
          password,
        })

  
        return plainToInstance(userEntity, newUser);
      }
    }

    async sign_in(email :string , password :string){
  const user = await this.AuthReponsitory.findOne({
    where: { email },
    select:['id','password'] ,

  });
  if(!user){
    throw new BadRequestException ('Invalid email or password')

  }

  else{
    const hashedPassword = user.password;
    const isMatch =  await bcrypt.compare(password ,hashedPassword)
    if(isMatch)
      return user
    else{   
       throw new BadRequestException ('Invalid email or password') 
    }
  }
      }
  }

    
