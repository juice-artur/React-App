import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReferenceTaskToColumn1711123930069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE tasks
            ADD CONSTRAINT FK_column_id
            FOREIGN KEY (column_id)
            REFERENCES task_columns(id) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}