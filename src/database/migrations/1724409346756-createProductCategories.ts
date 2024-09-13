import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductCategories1724409346756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "productCategories",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "productId",
                type: "int",
              },
              {
                name: "categoryId",
                type: "int",
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
            ],
          }),
        );
    
        await queryRunner.createForeignKey(
          "productCategories",
          new TableForeignKey({
            columnNames: ["productId"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
          }),
        );
    
        await queryRunner.createForeignKey(
          "productCategories",
          new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE",
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productCategories");
      }
    }