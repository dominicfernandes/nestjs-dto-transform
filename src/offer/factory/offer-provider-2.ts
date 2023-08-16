import { Injectable } from '@nestjs/common';
import {
  OfferProvider2DTO,
  OfferResponseProvider2,
} from '../dto/offer-provider-2.dto';
import { IOfferProvider } from '../interface/offer-provider.interface';
import { offerPayload2 } from './mock-data/offer2.payload';
import { OfferProvider } from '../offer-provider.enum';
import { uuid } from 'uuidv4';
import { OfferDTO } from '../dto/offer.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class OfferProvider2 implements IOfferProvider {
  providerName = OfferProvider.OFFER_PROVIDER_2;

  async getOffers(): Promise<OfferDTO[]> {
    return new Promise((resolve) => {
      resolve(this.mapToEntity(offerPayload2));
    });
  }

  private mapToEntity(offersData: OfferProvider2DTO): OfferDTO[] {
    const transformedRequestData = instanceToPlain(
      plainToInstance(OfferProvider2DTO, offersData),
    ).data;

    const transformedOffers = instanceToPlain(
      plainToInstance(OfferResponseProvider2, transformedRequestData),
    ) as { offer: OfferDTO }[];

    return transformedOffers.map(({ offer }) => ({
      ...offer,
      slug: uuid(),
      providerName: this.providerName,
    }));
  }
}
