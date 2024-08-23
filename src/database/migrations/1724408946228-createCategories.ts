import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategories1724408946228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "categories",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "name",
                type: "varchar",
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
                name: "userId",
                type: "int",
              },
            ],
          }),
        );
    
        await queryRunner.createForeignKey(
          "categories",
          new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          }),
        );
      }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }
  }
