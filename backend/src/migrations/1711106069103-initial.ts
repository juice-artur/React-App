import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1711106069103 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                column_id INT NOT NULL,
                title VARCHAR NOT NULL,
                description TEXT,
                position FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await queryRunner.query(`
            ALTER TABLE tasks
            ADD CONSTRAINT FK_column_id
            FOREIGN KEY (column_id)
            REFERENCES columns(id)
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS tasks
        `);
    }
}