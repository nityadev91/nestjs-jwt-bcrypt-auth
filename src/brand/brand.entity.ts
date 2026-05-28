import { Inventory } from "src/inventory/inventory.entity";
import { Vehicle } from "src/vehicles/vehicles.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
export enum Country{
    INDIA='india',
    OTHERS='others'
}

@Entity()
export class Brand{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    name:string;

    @Column({nullable:true,type:'enum',enum:Country})
    countryOfOrigin:Country;

    @OneToMany(()=>Vehicle,vehicle=>vehicle.brand) 
    vehicles: Vehicle[];

    @OneToMany(()=>Inventory, inventory=>inventory.brand)
    inventories:Inventory[];
}