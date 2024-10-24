import { Departments } from "../enums/departments.model";

export class Material {
    id?: any;
    name?: string;
    description?: string;
    providers?:any[]
    area?: Departments;
    zone?: string;
    position?: string;
    stock?: number;
    timestamp?: any;
}