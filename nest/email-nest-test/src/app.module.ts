import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { User } from './user/entities/user.entity';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    UserModule,
    RedisModule,
    TypeOrmModule.forRoot({
      username: 'root',
      password: '202411',
      port: 3306,
      host: 'localhost',
      type: 'mysql',
      connectorPackage: 'mysql2',
      entities: [User],
      logging: true,
      synchronize: true,
      poolSize: 10,
      extra: {
        authPlugin: 'sha256_password',
      },
      database: 'user_email',
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    // {
    //   provide: 'REDIS_CLIENT',
    // },
  ],
})
export class AppModule {}
