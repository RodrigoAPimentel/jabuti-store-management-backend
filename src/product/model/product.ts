import { Document } from 'mongoose';

export class Product extends Document {
    code: string;
    bar_code: string;
    name: string;
    description: string;
    quantity: number;
    minimum_quantity: number;
    purchase_price: number;
    sale_price: number;
    acitve: boolean;
}
