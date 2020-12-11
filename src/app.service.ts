import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    get(): string {
        return `${process.env.API_NAME}-${process.env.API_VERSION}`;
    }
}
