import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1718122739709 implements MigrationInterface {
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
      ('Zainab', 'Yusuf', 'Monthly Premium', '2024-08-01', '2024-09-01', 50, 'user6@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ifeanyi', 'Eze', 'Annual Basic', '2024-02-10', '2025-02-10', 500, 'user7@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Hauwa', 'Mohammed', 'Monthly Premium', '2024-03-20', '2024-04-20', 50, 'user8@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Chiamaka', 'Nwankwo', 'Annual Premium', '2024-09-15', '2025-09-15', 800, 'user9@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ibrahim', 'Suleiman', 'Monthly Basic', '2024-04-05', '2024-05-05', 30, 'user10@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Yetunde', 'Akinwale', 'Annual Basic', '2024-07-22', '2025-07-22', 500, 'user11@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Emeka', 'Okonkwo', 'Monthly Premium', '2024-08-15', '2024-09-15', 50, 'user12@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Funmi', 'Ayodele', 'Annual Premium', '2024-10-01', '2025-10-01', 800, 'user13@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Musa', 'Danjuma', 'Monthly Basic', '2024-01-10', '2024-02-10', 30, 'user14@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Kelechi', 'Ogu', 'Annual Basic', '2024-03-01', '2025-03-01', 500, 'user15@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Halima', 'Bello', 'Monthly Premium', '2024-05-01', '2024-06-01', 50, 'user16@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Obinna', 'Nwachukwu', 'Annual Premium', '2024-07-01', '2025-07-01', 800, 'user17@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Adebisi', 'Alade', 'Monthly Basic', '2024-02-15', '2024-03-15', 30, 'user18@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Adaeze', 'Eze', 'Annual Basic', '2024-06-10', '2025-06-10', 500, 'user19@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Sulaiman', 'Abubakar', 'Monthly Premium', '2024-09-01', '2024-10-01', 50, 'user20@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Amaka', 'Chukwu', 'Annual Basic', '2024-01-15', '2025-01-15', 500, 'user21@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Chigozie', 'Umeh', 'Monthly Premium', '2024-04-01', '2024-05-01', 50, 'user22@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Yemi', 'Adedoyin', 'Annual Premium', '2024-11-01', '2025-11-01', 800, 'user23@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Chinwe', 'Onwubiko', 'Monthly Basic', '2024-05-10', '2024-06-10', 30, 'user24@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Aminu', 'Garba', 'Annual Basic', '2024-02-05', '2025-02-05', 500, 'user25@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ifunanya', 'Obinna', 'Monthly Premium', '2024-03-25', '2024-04-25', 50, 'user26@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Tunde', 'Ajayi', 'Annual Premium', '2024-08-01', '2025-08-01', 800, 'user27@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ngozi', 'Anozie', 'Monthly Basic', '2024-09-20', '2024-10-20', 30, 'user28@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ebuka', 'Okeke', 'Annual Basic', '2024-03-10', '2025-03-10', 500, 'user29@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Mariam', 'Lawal', 'Monthly Premium', '2024-10-01', '2024-11-01', 50, 'user30@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Nnamdi', 'Kalu', 'Annual Premium', '2024-06-01', '2025-06-01', 800, 'user31@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Rahmat', 'Suleiman', 'Monthly Basic', '2024-02-10', '2024-03-10', 30, 'user32@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Tochukwu', 'Egbuna', 'Annual Basic', '2024-07-01', '2025-07-01', 500, 'user33@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Temidayo', 'Afolabi', 'Monthly Premium', '2024-08-10', '2024-09-10', 50, 'user34@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Bolaji', 'Ogundipe', 'Annual Basic', '2024-01-20', '2025-01-20', 500, 'user35@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Latifat', 'Mustapha', 'Monthly Premium', '2024-04-01', '2024-05-01', 50, 'user36@yopmail.com', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Chukwuma', 'Obinna', 'Annual Premium', '2024-05-15', '2025-05-15', 800, 'user37@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Kudirat', 'Olamide', 'Monthly Basic', '2024-06-01', '2024-07-01', 30, 'user38@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Ekene', 'Anyanwu', 'Annual Basic', '2024-08-01', '2025-08-01', 500, 'user39@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ('Modupe', 'Adebayo', 'Monthly Premium', '2024-09-10', '2024-10-10', 50, 'user40@yopmail.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    // Get IDs of the inserted memberships
    const chineduOkaforMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Chinedu' AND "lastName" = 'Okafor'`,
    );
    const femiAdeyemiMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Femi' AND "lastName" = 'Adeyemi'`,
    );
    const zainabYusufMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Zainab' AND "lastName" = 'Yusuf'`,
    );

    const hauwaMohammedMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Hauwa' AND "lastName" = 'Mohammed'`,
    );

    const yetundeAkinwaleMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Yetunde' AND "lastName" = 'Akinwale'`,
    );

    const funmiAyodeleMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Funmi' AND "lastName" = 'Ayodele'`,
    );
    const musaDanjumaMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Musa' AND "lastName" = 'Danjuma'`,
    );

    const obinnaNwachukwuMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Obinna' AND "lastName" = 'Nwachukwu'`,
    );

    const adaEzeMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Adaeze' AND "lastName" = 'Eze'`,
    );

    const sulaimanAbubakarMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Sulaiman' AND "lastName" = 'Abubakar'`,
    );

    const yemiAdedoyinMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Yemi' AND "lastName" = 'Adedoyin'`,
    );

    const tundeAjayiMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Tunde' AND "lastName" = 'Ajayi'`,
    );

    const mariamLawalMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Mariam' AND "lastName" = 'Lawal'`,
    );

    const tochukwuEgbunaMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Tochukwu' AND "lastName" = 'Egbuna'`,
    );

    const chukwumaObinnaMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Chukwuma' AND "lastName" = 'Obinna'`,
    );

    // Ekene - M39
    const ekeneAnyanwuMembership = await queryRunner.query(
      `SELECT id FROM "memberships" WHERE "firstName" = 'Ekene' AND "lastName" = 'Anyanwu'`,
    );

    // Insert data into "addon_services" table using the retrieved membership IDs
    await queryRunner.query(`
      INSERT INTO "addon_services" ("membershipID", "serviceName", "monthlyAmount", "dueDate", "createdAt", "updatedAt") VALUES
      (${chineduOkaforMembership[0].id}, 'Personal Training', 100.00, '2024-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${femiAdeyemiMembership[0].id}, 'Towel Rentals', 20.00, '2024-06-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${zainabYusufMembership[0].id}, 'Personal Training', 100.00, '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${hauwaMohammedMembership[0].id}, 'Towel Rentals', 20.00, '2024-04-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${yetundeAkinwaleMembership[0].id}, 'Personal Training', 100, '2024-08-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${funmiAyodeleMembership[0].id}, 'Towel Rentals', 20, '2024-10-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${musaDanjumaMembership[0].id}, 'Personal Training', 100, '2024-01-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${obinnaNwachukwuMembership[0].id}, 'Towel Rentals', 20, '2024-07-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${adaEzeMembership[0].id}, 'Personal Training', 100, '2024-06-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${sulaimanAbubakarMembership[0].id}, 'Towel Rentals', 20, '2024-10-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${yemiAdedoyinMembership[0].id}, 'Personal Training', 100, '2024-11-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${tundeAjayiMembership[0].id}, 'Towel Rentals', 20, '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${mariamLawalMembership[0].id}, 'Personal Training', 100, '2024-10-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${tochukwuEgbunaMembership[0].id}, 'Towel Rentals', 20, '2024-08-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${chukwumaObinnaMembership[0].id}, 'Personal Training', 100, '2024-05-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      (${ekeneAnyanwuMembership[0].id}, 'Towel Rentals', 20, '2024-08-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "addon_services"`);
    await queryRunner.query(`DELETE FROM "memberships"`);
  }
}
