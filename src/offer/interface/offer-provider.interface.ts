import { OfferDTO } from '../dto/offer.dto';

export interface IOfferProvider {
  providerName: string;
  getOffers(): Promise<OfferDTO[]>;
}
