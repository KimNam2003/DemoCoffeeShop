import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateComments1724409653071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng comments
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "content",
                        type: "text",
                    },
                    {
                        name: "vote",
                        type: "enum",
                        enum: ["1", "2","3" , "4", "5"],  // Không có dấu ngoặc kép
                        isNullable: true,
                    },
                    {
                        name: "userId",
                        type: "int",
                    },
                    {
                        name: "productId",
                        type: "int",
                    },
                    {
                        name: "parentId",
                        type: "int",
                        isNullable: true,
                    },
                ],
            }),
        );

        // Thêm khóa ngoại cho userId
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }),
        );

        // Thêm khóa ngoại cho productId
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "products",
                onDelete: "CASCADE",
            }),
        );

        // Thêm khóa ngoại cho parentId
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["parentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "comments",
                onDelete: "SET NULL",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments");
    }
}