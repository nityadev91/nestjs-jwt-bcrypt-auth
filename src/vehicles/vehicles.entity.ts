import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

export enum Brand {
    TOYOTA = 'toyota',
    HONDA = 'honda',
    BMW = 'bmw',
    MERCEDES = 'mercedes',
    MARUTI = 'maruti',
    TATA = 'tata',
    MAHINDRA = 'mahindra',
    BAJAJ = 'bajaj',
    HERO = 'hero',
    ROYAL_ENFIELD = 'royal_enfield',
    TVS = 'tvs',
    ASHOK_LEYLAND = 'ashok_leyland',
    EICHER = 'eicher'
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: VehicleType;

    @Column()
    brand: Brand;

    @Column({ name: 'model_name' })
    modelName: string;

    @Column({ name: 'model_year' })
    modelYear: string;

    @CreateDateColumn({ select: false, name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ select: false, name: 'updated_at' })
    updatedAt: Date;
}
