import { Injectable } from '@nestjs/common';
import { Product } from '../model/product';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async getById(id: string): Promise<Product> {
        return await this.productModel.findById(id).exec();
    }

    async create(product: Product): Promise<Product> {
        const productCreated = new this.productModel(product);
        return await productCreated.save();
    }

    async update(id: string, product: Product): Promise<Product> {
        await this.productModel.updateOne({ _id: id }, product).exec();
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.productModel.deleteOne({ _id: id }).exec();
    }

    async checksDuplicity(product: Product): Promise<string> {
        const productFoundBarCode = await this.productModel.findOne({ bar_code: product.bar_code });
        const productFoundName = await this.productModel.findOne({ name: product.name });
        if (productFoundBarCode || productFoundName) {
            return `Product already registered !`;
        }
    }
}
