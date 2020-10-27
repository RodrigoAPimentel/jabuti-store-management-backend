/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAll() {
        const products = await this.productService.getAll();
        if (products.length === 0) {
            return 'There are no products!';
        }
        return products;
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        let product;
        try {
            product = await this.productService.getById(id);
            if (product === null) {
                return 'The Product does not exist!';
            } else {
                return product;
            }
        } catch (error) {
            console.log(error);
            return 'The Product does not exist!';
        }
    }

    @Post()
    async create(@Body() product: Product) {
        const productFound = await this.productService.checksDuplicity(product);
        if (productFound) {
            return productFound;
        }
        return await this.productService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product) {
        return await this.productService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.productService.delete(id);
    }
}
