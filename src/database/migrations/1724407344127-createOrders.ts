import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrders1724407344127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "orders",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "buyerName",
                type: "varchar",
              },
              {
                name: "buyerPhone",
                type: "varchar",
                isNullable :true
              },
              {
                name: "buyerEmail",
                type: "varchar",
              },
              {
                name: "buyerAddress",
                type: "varchar",
                isNullable :true

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
                name: "status",
                type: "enum",
                enum: ["pending", "confirm", "cancel"],
                default: "'pending'", // Đặt giá trị mặc định trong dấu nháy đơn
              },
              {
                name: "userId",
                type: "int",
              },
            ],
          }),
        );
        await queryRunner.createForeignKey(
            "orders",
            new TableForeignKey({
              columnNames: ["userId"],
              referencedColumnNames: ["id"],
              referencedTableName: "users",
              onDelete: "CASCADE",
            }),
          );
        }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
      }
    }