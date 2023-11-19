import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getH2(): string {
    throw new Error('Method not implemented.');
  }
  getH1(): string {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
