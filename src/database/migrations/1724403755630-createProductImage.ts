import { table } from "console";
import { Column, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductImage1724403755630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ProductImage",
                columns:[{
                    name: "id",
                    type: "int",
                    isPrimary:true,
                    generationStrategy:"increment",
                    isGenerated:true
                },
                {
                    name:"createdAt",
                    type:"timestamp",
                    default:"now()"
                },
                {
                    name:"  updatedAt",
                    type:"timestamp",
                    default:"now()"
                },
                {
                    name:" imageUrl",
                    type:"nvarchar",
                    
                },
                {
                    name:"productId",
                    type:"int",
                },
                ]
            }
            )
        ),
        await queryRunner.createForeignKey(
            "ProductImage",
            new TableForeignKey({
                columnNames:["productId"],
                referencedColumnNames:["id"],
                referencedTableName:"products",
                onDelete:"CASCADE"
            }
            )    
        ),true
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ProductImage")
    }

}
