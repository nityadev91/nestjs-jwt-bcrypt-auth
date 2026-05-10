import { Injectable } from '@nestjs/common';
import { DataSource, Timestamp } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource, private readonly configService: ConfigService) {}

  getHello(): string {
    const databaseStatus = this.dataSource.isInitialized ? 'Connected' : 'Disconnected';
    const databaseName = this.dataSource.options.database;
    const databaseType = this.dataSource.options.type;
    const timestamp = new Date().toLocaleString();
    const port = this.configService.get('PORT');
    return `<body>
    <h1>Welcome to NestJS Project!</h1>
    <p>Database: ${databaseName} (${databaseType})</p>
    <p>Database status: ${databaseStatus}</p>
    <p>Timestamp: ${timestamp}</p>
    <p>Server Port: ${port}</p>
    </body>`;
  }
}
