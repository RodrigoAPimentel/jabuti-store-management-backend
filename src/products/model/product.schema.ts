import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    code: String,
    bar_code: String,
    name: String,
    description: String,
    quantity: Number,
    minimum_quantity: Number,
    purchase_price: Number,
    sale_price: Number,
    acitve: Boolean,
    image: String,
});
