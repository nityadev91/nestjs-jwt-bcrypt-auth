import { Brand } from "src/brand/brand.entity";
import { Vehicle } from "src/vehicles/vehicles.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";

@Entity()
export class Inventory{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({nullable:false})
    name:string;

    @Column({})
    partNumber:string;

    @Column()
    sku:number;

    @ManyToOne(()=>Brand, brand=>brand.inventories)
    brand:Brand;

    @ManyToMany(()=>Vehicle, vehicle=>vehicle.inventories)
    @JoinTable()
    vehicles:Vehicle[];

    @Column()
    costPrice:number;

    @Column()
    retailPrice:number;
}

