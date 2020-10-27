import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

import { MongooseModule } from '@nestjs/mongoose';

import { ProductSchema } from './model/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema,
            },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
