import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { product } from "../entity/products.entity";
import { productService } from "./service/product.service";
import { productController } from "./controller/product.controller";
import { ProductImage } from "../entity/productImage.entity";

@Module({
    imports: [TypeOrmModule.forFeature([product,ProductImage],)],
    controllers: [productController],
    providers: [productService],
  })
  export class productModule {}
  