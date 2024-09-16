import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userEntity } from "./user.entity";
import { product } from "./products.entity";

@Entity("productImage")
export class ProductImage {
    @PrimaryGeneratedColumn()
    id :number

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @Column()
    imageUrl : string

    @Column()
    productId: number



    @ManyToOne(()=> product , (product)=> product.productImage)
    product: product; 


}