import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedReferencesBerweencolumn1711789017753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE history_of_changes_board
            ADD COLUMN board_id INTEGER,
            ADD CONSTRAINT FK_BoardId FOREIGN KEY (board_id)
            REFERENCES board(id) ON DELETE CASCADE;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
