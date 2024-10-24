import { Material } from "../catalogue/material.model";

export class InvRawMaterial {
    id?: any;
    materialId?: string;
    name?:string;
    available?:number
    commited?:number
    waitingCommited?:number
    waiting?:number
    timestamp?:any
}