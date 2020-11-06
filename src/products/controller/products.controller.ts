/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../model/product';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getAll() {
        const products = await this.productsService.getAll();
        if (products.length === 0) {
            return 'There are no products!';
        }
        return products;
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        let product;
        try {
            product = await this.productsService.getById(id);
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
        const productFound = await this.productsService.checksDuplicity(product);
        if (productFound) {
            return productFound;
        }
        return await this.productsService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product) {
        return await this.productsService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.productsService.delete(id);
    }
}
