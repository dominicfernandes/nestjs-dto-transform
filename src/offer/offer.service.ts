import { Inject, Injectable } from '@nestjs/common';
import { OfferProviderFactory } from './factory/offer-provider.factory';
import { OfferProvider } from './offer-provider.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { OfferDTO } from './dto/offer.dto';

@Injectable()
export class OfferService {
  @Inject()
  private readonly offerFactory: OfferProviderFactory;

  @InjectRepository(Offer)
  private offerRepository: Repository<Offer>;

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncOffersFromProviders() {
    const offerProviders = Object.keys(OfferProvider);

    const offerPromises = offerProviders.map((provider) => {
      try {
        const offerProvider = this.offerFactory.getOfferProvider(
          OfferProvider[provider],
        );
        return offerProvider.getOffers();
      } catch (error) {
        console.log(
          error,
          `An error occured while fetching offer from provider: ${provider}`,
        );
      }
    });

    const offers = (await Promise.all(offerPromises)).reduce(
      (prev, next) => [...prev, ...next],
      [],
    );

    offers.forEach(async (offer) => {
      const validationError = await validate(plainToInstance(OfferDTO, offer));

      if (validationError.length) {
        console.log(
          `WARNING: Validation failed for offer id: ${offer.externalOfferId} for provider ${offer.providerName}`,
        );
        console.log(validationError);
        return;
      }

      const exists = await this.offerRepository.exist({
        where: { externalOfferId: offer.externalOfferId },
      });

      if (exists) {
        console.log(
          `offer with external id ${offer.externalOfferId} already exists.`,
        );
        return;
      }

      await this.offerRepository.insert(offer);
    });
  }
}
