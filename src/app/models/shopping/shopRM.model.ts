import { Product } from "../catalogue/product.model";
import { Orders } from "../inventory/orders.model";

export class ShopRM {
    id?: any;
    materialId?:string;
    stockId?:string
    name?:string;
    requiredMaterial?:number;
    requestedAmount?:number;
    orderDeadline?:any;
    emissionDate?:any;
    cost?:any
    fulfilled?:any   
    timestamp?:any;
}