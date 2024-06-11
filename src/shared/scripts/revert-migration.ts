import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../ormconfig';

const dataSource = new DataSource(dataSourceOptions);

async function revertMigration() {
  try {
    await dataSource.initialize();

    Logger.verbose('Data Source initialized!');

    // revert migrations
    await dataSource.undoLastMigration();

    Logger.verbose('Migrations reverted!');

    // optionally, you can close the data source after running migrations
    await dataSource.destroy();

    Logger.verbose('Data Source destroyed!');
  } catch (error) {
    Logger.error(`Error during migration run: ${JSON.stringify(error)}`);
  }
}

revertMigration();
