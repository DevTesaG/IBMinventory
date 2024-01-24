import { Timestamp } from 'firebase/firestore'

export class Client {
    id?: any;
    code?: any;
    phone?: number;
    name?: string;
    address?: string;
    timestamp?: Timestamp;
}