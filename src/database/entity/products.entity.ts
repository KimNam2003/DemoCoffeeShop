import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { userEntity } from "./user.entity";

@Entity("products")
export class product {
    @PrimaryGeneratedColumn()
    id :number

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    quantity: number

    
    @Column()
    quantitySold: number

    @Column()
    price: number

    @Column()
    userId: number

    @ManyToOne(()=> userEntity , (user)=> user.products)
    user: userEntity; 


}