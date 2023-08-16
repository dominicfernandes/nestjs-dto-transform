import { Inject, Injectable } from '@nestjs/common';
import { OfferProvider } from '../offer-provider.enum';
import { OfferProvider1 } from './offer-provider-1';
import { OfferProvider2 } from './offer-provider-2';
import { IOfferProvider } from '../interface/offer-provider.interface';

@Injectable()
export class OfferProviderFactory {
  @Inject()
  private readonly offerProvider1: OfferProvider1;

  @Inject()
  private readonly offerProvider2: OfferProvider2;

  getOfferProvider(offerProvider: OfferProvider): IOfferProvider {
    switch (offerProvider) {
      case OfferProvider.OFFER_PROVIDER_1:
        return this.offerProvider1;
      case OfferProvider.OFFER_PROVIDER_2:
        return this.offerProvider2;
      default:
        throw new Error('Unknown Offer Provider');
    }
  }
}
