import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany } from "typeorm";
import { Customer } from '../customer/customer.entity';
import { Brand } from "src/brand/brand.entity";
import { MaxLength } from "class-validator";
import { ServiceTicket } from "src/service-ticket/service-ticket.entity";
import { Inventory } from "src/inventory/inventory.entity";

export enum VehicleType {
    CAR = 'car',
    MOTORCYCLE = 'motorcycle',
    TRUCK = 'truck',
    BUS = 'bus',
    VAN = 'van',
    SUV = 'suv',
    PICKUP = 'pickup',
    OTHER = 'other'
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'enum',enum:VehicleType})
    'vehicleType': VehicleType;

    @Column({})
    modelName: string;

    @Column({})
    modelYear: number;

    @Column({ nullable: true })
    engineType: string;

    @ManyToOne(() => Customer, customer => customer.vehicles)
    customer: Customer;

    @ManyToOne(() => Brand, brand => brand.vehicles)
    brand: Brand;

    @ManyToMany(()=>Inventory,inventory=>inventory.vehicles)
    inventories:Inventory[];

    @OneToOne(() => ServiceTicket, ticket => ticket.vehicle)
    ticket: ServiceTicket;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}
