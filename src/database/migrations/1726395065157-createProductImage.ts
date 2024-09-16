import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductImage1726395065157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "productImage",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "imageUrl",
                        type: "varchar", // Sửa từ 'nvarchar' thành 'varchar'
                    },
                    {
                        name: "productId",
                        type: "int",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "productImage",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productImage");
    }
}
