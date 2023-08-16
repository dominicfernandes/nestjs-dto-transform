import { Module } from '@nestjs/common';
import { OfferModule } from './offer/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Offer } from './offer/entity/offer.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    OfferModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Offer],
        synchronize: true,
        logging: ['info', 'error', 'warn', 'query'],
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
