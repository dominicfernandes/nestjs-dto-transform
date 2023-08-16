import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferProviderFactory } from './factory/offer-provider.factory';
import { OfferProvider1 } from './factory/offer-provider-1';
import { OfferProvider2 } from './factory/offer-provider-2';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  providers: [
    OfferService,
    OfferProviderFactory,
    OfferProvider1,
    OfferProvider2,
  ],
  exports: [OfferService],
})
export class OfferModule {}
