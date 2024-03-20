import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDbConfig } from './config/db.config';
import { ArticleModule } from './domains/article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './domains/user/user.module';
import { Article } from './persistence/entities/article.entity';
import { Channel } from './persistence/entities/channel.entity';
import { CronService } from './services/cron.service';
import { RssSyncService } from './services/rss/rss-sync.service';
import { ChannelModule } from './domains/channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDbConfig,
    }),
    TypeOrmModule.forFeature([Article, Channel]),
    ScheduleModule.forRoot(),
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService, RssSyncService, CronService],
})
export class AppModule {}
