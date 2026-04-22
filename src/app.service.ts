import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  getHello(): string {
    const databaseStatus = this.dataSource.isInitialized ? 'Connected' : 'Disconnected';
    const databaseName = this.dataSource.options.database;
    const databaseType = this.dataSource.options.type;
    const databaseInfo = `Database: ${databaseName} (${databaseType})`;
    const timestamp = new Date().toISOString();
    const databaseStatusInfo = `Database status: ${databaseStatus}`;
    return `Welcome to NestJS Project!\n${databaseInfo}\n${databaseStatusInfo}\nTimestamp: ${timestamp}`;
  }
}
