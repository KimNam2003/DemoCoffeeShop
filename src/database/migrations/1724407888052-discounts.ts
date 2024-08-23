import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Discounts1724407888052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng discounts
        await queryRunner.createTable(
          new Table({
            name: "discounts",
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
                name: "name",
                type: "varchar",
              },
              {
                name: "discountType",
                type: "enum",
                enum: ["%","fixed"],
                default:"'%'"
              },
              {
                name: "discountAmount",
                type: "int",
              },
              {
                name: "expiredAt",
                type: "datetime",
              },
              {
                name: "startAt",
                type: "datetime",
              },
              {
                name: "status",
                type: "enum",
                enum:["active","inactive"],
                default:"'active'"
              },
              {
                name: "adminId",
                type: "int",
              },
            ],
          }),
        );
    
        // Tạo khóa ngoại cho cột adminId tham chiếu đến bảng users
        await queryRunner.createForeignKey(
          "discounts",
          new TableForeignKey({
            columnNames: ["adminId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa bảng discounts khi revert migration
        await queryRunner.dropTable("discounts");
      }
    }