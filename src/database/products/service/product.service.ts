import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { product } from "src/database/entity/products.entity";
import { DataSource, Repository } from "typeorm";
import { productDTO } from "../DTO/product.dto";
import { userEntity } from "src/database/entity/user.entity";
import * as path from 'path';
import * as fs from 'fs'
import { ProductImage } from "src/database/entity/productImage.entity";

@Injectable()
export class productService {
    constructor(
        @InjectRepository(product)
        private productReponsitory: Repository<product>,
        @InjectRepository(ProductImage)
        private productImageReponsitory: Repository<ProductImage>,
        private dataSource: DataSource) { }


    productAll() {
        return this.productReponsitory.find()
    }

    productOne(id: number) {
        return this.productReponsitory.findOneBy({ id })
    }

    async updateProduct(id: number, updateProduct: productDTO) {
        return await this.productReponsitory.save({
            id,
            ...updateProduct,
        });
    }
    async createProduct(newProduct: productDTO, user: userEntity, file: Express.Multer.File[]) {
        let Product;
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            Product = await queryRunner.manager.save(product, {
                ...newProduct,
                userId: user.id
            })
            const subFolder = `products/${Product.id.toString()}`
            const folderDir = path.join('public', subFolder)
            if (!fs.existsSync(folderDir)) {
                fs.mkdirSync(folderDir, { recursive: true })
            }

            await Promise.all(
                file.map(async (file) => {
                    const filePath = `${folderDir}/${file.originalname}`
                    fs.writeFileSync(filePath, file.buffer)

                    await queryRunner.manager.save(ProductImage, {
                        imageUrl: `${process.env.HOST}/${subFolder}/${file.originalname}`,
                        productId: Product.id

                    })

                })

            )
            await queryRunner.commitTransaction()
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err

        }
        finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }

        return this.productReponsitory.findOne({
            where: {
                id: Product.id
            },
            relations: {
                productImage: true
            }
        });


    }

}