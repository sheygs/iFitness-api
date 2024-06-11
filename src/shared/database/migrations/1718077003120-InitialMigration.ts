import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1718077003120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER SEQUENCE memberships_id_seq RESTART WITH 1');

    await queryRunner.query(
      'ALTER SEQUENCE addon_services_id_seq RESTART WITH 1',
    );

    await queryRunner.query(`
      INSERT INTO "memberships" ("firstName", "lastName", "membershipType", "startDate", "dueDate", "totalAmount", "email", "isFirstMonth", "createdAt", "updatedAt") VALUES
      ('Chinedu', 'Okafor', 'Annual Basic', '2024-01-01', '2025-01-01', 500, 'user1@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Aisha', 'Abubakar', 'Monthly Premium', '2024-03-15', '2024-04-15', 50, 'user2@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Femi', 'Adeyemi', 'Annual Premium', '2024-05-01', '2025-05-01', 800, 'user3@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Nneka', 'Nwosu', 'Monthly Basic', '2024-06-01', '2024-07-01', 30, 'user4@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Olusegun', 'Adebayo', 'Annual Basic', '2024-07-15', '2025-07-15', 500, 'user5@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Zainab', 'Yusuf', 'Monthly Premium', '2024-08-01', '2024-09-01', 50, 'user6@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    // Get the IDs of the inserted memberships
    const chineduOkaforMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Chinedu' AND "lastName" = 'Okafor'`,
    );

    const femiAdeyemiMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Femi' AND "lastName" = 'Adeyemi'`,
    );

    const zainabYusufMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Zainab' AND "lastName" = 'Yusuf'`,
    );

    // Insert data into addon-services table using the retrieved membership IDs
    await queryRunner.query(`
      INSERT INTO "addon_services" ("membershipID", "serviceName", "monthlyAmount", "dueDate", "createdAt", "updatedAt") VALUES
      (${chineduOkaforMembership[0].id}, 'Personal Training', 100.00, '2024-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${femiAdeyemiMembership[0].id}, 'Towel Rentals', 20.00, '2024-06-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${zainabYusufMembership[0].id}, 'Personal Training', 100.00, '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "addon_services"`);

    await queryRunner.query(`DELETE FROM "memberships"`);
  }
}
