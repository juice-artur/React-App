import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoardTable1711786840883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS board (
                id SERIAL PRIMARY KEY,
                title VARCHAR NOT NULL
            );
        `);

        await queryRunner.query(`
            ALTER TABLE task_column
            ADD COLUMN board_id INTEGER;
        `);

        await queryRunner.query(`
            ALTER TABLE task_column
            ADD CONSTRAINT FK_Column_BoardId FOREIGN KEY (board_id)
            REFERENCES board(id) ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE task_column
            DROP CONSTRAINT IF EXISTS FK_Column_BoardId;
        `);

        await queryRunner.query(`
            ALTER TABLE task_column
            DROP COLUMN IF EXISTS board_id;
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS board;
        `);
    }
}