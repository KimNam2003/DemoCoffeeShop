import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { product } from "src/database/entity/products.entity";
import { Repository } from "typeorm";
import { productDTO } from "../DTO/product.dto";
import { userEntity } from "src/database/entity/user.entity";

@Injectable()
export class productService{
    constructor(
        @InjectRepository(product)
        private productReponsitory : Repository<product>){};

    productAll()  {
         return this.productReponsitory.find()
    }
    
    productOne( id : number)  {
      return  this.productReponsitory.findOneBy({id})
    }

    async updateProduct(id : number ,updateProduct : productDTO){
        return await this.productReponsitory.save({
            id,
            ...updateProduct,
          });
    }
    createProduct ( newProduct : productDTO , user :userEntity) {
        return this.productReponsitory.save({
            ...newProduct,
            userId :user.id
        })
    }

}