import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniqueCodeEntity } from './uniqueCode.entities';
import { UniqueCodeService } from './unique-code.service';
import { ShortLongMap } from './short-long-map.entities';
import { ShortLongMapService } from './short-long-map.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      poolSize: 10,
      synchronize: true,
      password: '202411',
      username: 'root',
      logging: true,
      port: 3306,
      type: 'mysql',
      connectorPackage: 'mysql2',
      database: 'short-url',
      entities: [UniqueCodeEntity, ShortLongMap],
      extra: {
        authPlugin: 'sha256_password',
      },
      host: 'localhost',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UniqueCodeService, ShortLongMapService],
})
export class AppModule {}
