import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './user/user.entity';
import { Customer } from './customer/customer.entity';
import { Brand } from './brand/brand.entity';
import { Vehicle } from './vehicles/vehicles.entity';
import { Inventory } from './inventory/inventory.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { BrandModule } from './brand/brand.module';
import { VehicleModule } from './vehicles/vehicles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceTicket } from './service-ticket/service-ticket.entity';
import { Bills } from './bills/bills.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.production',
    }), // Load environment variables from .env file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Customer, Brand, Vehicle, Inventory, ServiceTicket, Bills],
        //convert all your camelCase properties into snake_case in the database
        namingStrategy: new SnakeNamingStrategy(),
        // it will sync the database with typeorm  (tables, indexs etc) 
        synchronize: true, //
        // If true, entire scheme will be reset during restart
        // dropSchema: false, 
      }),
    }),
    UserModule,
    AuthModule,
    CustomerModule,
    BrandModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
