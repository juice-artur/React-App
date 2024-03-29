import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriorityToTask1711395562778 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        const existingType = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1
                FROM pg_type
                WHERE typname = 'priority'
            );
        `);

        if (!existingType[0].exists) {
            await queryRunner.query(`
                CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH');
            `);
        }

        await queryRunner.query(`
            ALTER TABLE task
            ADD COLUMN priority priority DEFAULT 'LOW'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE task
            DROP COLUMN priority
        `);

        await queryRunner.query(`
            DROP TYPE IF EXISTS priority;
        `);
    }
}
