import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vehicle } from "./vehicles.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Vehicle])],
    controllers:[],
    providers:[],

})
export class VehicleModule{}
