import { Injectable } from '@nestjs/common';
import { OfferProvider1DTO } from '../dto/offer-provider-1.dto';
import { IOfferProvider } from '../interface/offer-provider.interface';
import { offerPayload1 } from './mock-data/offer1.payload';
import { OfferProvider } from '../offer-provider.enum';
import { uuid } from 'uuidv4';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { OfferDTO } from '../dto/offer.dto';

@Injectable()
export class OfferProvider1 implements IOfferProvider {
  providerName = OfferProvider.OFFER_PROVIDER_1;

  getOffers(): Promise<OfferDTO[]> {
    return new Promise((resolve) => {
      resolve(this.mapToEntity(offerPayload1));
    });
  }

  private mapToEntity(data: OfferProvider1DTO): OfferDTO[] {
    const transformedData = instanceToPlain(
      plainToInstance(OfferProvider1DTO, data),
    ).response.offers as OfferDTO[];

    return transformedData.map((offer) => ({
      ...offer,
      slug: uuid(),
      isAndroid: Number(!offer.isIos),
      providerName: this.providerName,
    }));
  }
}
