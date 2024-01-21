import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import {} from 'redis'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { Aaa } from './aaa/entities/aaa.entity';
import { createClient } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '202411',
      poolSize: 10,
      port: 3306,
      logging: true,
      synchronize: true,
      entities: [Aaa],
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
      host: 'localhost',
      database: 'aaa',
    }),
    AaaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        await client.connect();

        return client;
      },
    },
  ],
})
export class AppModule {}
