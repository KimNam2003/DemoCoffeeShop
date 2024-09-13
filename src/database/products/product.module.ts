import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { product } from "../entity/products.entity";
import { productService } from "./service/product.service";
import { productController } from "./controller/product.controller";

@Module({
    imports: [TypeOrmModule.forFeature([product])],
    controllers: [productController],
    providers: [productService],
  })
  export class productModule {}
  