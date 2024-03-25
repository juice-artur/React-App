import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityToTask1711395562778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        await queryRunner.query(`
            CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH');
        `);

        await queryRunner.query(`
            ALTER TABLE task
            ADD COLUMN priority priority DEFAULT 'LOW'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the priority column from the task table
        await queryRunner.query(`
            ALTER TABLE task
            DROP COLUMN priority
        `);

        // Drop the ENUM type for priority
        await queryRunner.query(`
            DROP TYPE IF EXISTS priority_enum;
        `);

}
}