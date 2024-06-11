import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../ormconfig';

const dataSource = new DataSource(dataSourceOptions);

async function runMigration() {
  try {
    await dataSource.initialize();

    Logger.verbose('Data Source initialized!');

    // run migrations
    await dataSource.runMigrations();

    Logger.verbose('Migrations run successfully!');

    // optionally, you can close the data source after running migrations
    await dataSource.destroy();

    Logger.verbose('Data Source destroyed!');
  } catch (error) {
    Logger.error(`Error during migration run: ${JSON.stringify(error)}`);
  }
}

runMigration();
