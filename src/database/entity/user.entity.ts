import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { product } from "./products.entity";

@Entity("users")
export class userEntity {
    @PrimaryGeneratedColumn()
    id :number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  favoriteTheme: string;

  @OneToMany(()=> product , (product)=> product.user)
  products :product[]

}
