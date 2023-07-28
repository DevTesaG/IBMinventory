import { Departments } from "../enums/departments.model";

export class Material {
    id?: any;
    name?: string;
    available?:number
    commited?:number
    watingCommited?:number
    wating?:number
    description?: string;
    minBatch?: number;
    deliveryTime?: number;
    area?: Departments;
    zone?: string;
    position?: string;
    price?: number;
    stock?: number;
    toBuy?:number;
    unitaryConsumption?: number
    onFP?:boolean;
    timestamp?: any;
    // orderDays?: number
    // totalConsumption?:number
}