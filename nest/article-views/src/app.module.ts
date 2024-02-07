import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      username: 'root',
      password: '202411',
      database: 'article_views',
      port: 3306,
      connectorPackage: 'mysql2',
      synchronize: true,
      logging: true,
      extra: {
        authPlugin: 'sha256_password',
      },
      type: 'mysql',
      host: 'localhost',
      entities: [User, Article],
      poolSize: 10,
    }),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
