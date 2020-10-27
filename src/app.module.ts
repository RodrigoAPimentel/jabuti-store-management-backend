import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        ProductModule,
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`,
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
