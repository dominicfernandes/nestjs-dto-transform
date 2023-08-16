import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';

class OfferQuery {
  @Exclude({ toPlainOnly: true })
  pubid: string;

  @Exclude({ toPlainOnly: true })
  appid: number;

  @Exclude({ toPlainOnly: true })
  country: string;

  @Exclude({ toPlainOnly: true })
  platform: string;
}

class OfferVertical {
  @Exclude({ toPlainOnly: true })
  vertical_id: string;

  @Exclude({ toPlainOnly: true })
  vertical_name: string;
}

class OfferData {
  @Expose({ name: 'externalOfferId', toPlainOnly: true })
  offer_id: string;

  @Expose({ name: 'name', toPlainOnly: true })
  offer_name: string;

  @Expose({ name: 'description', toPlainOnly: true })
  offer_desc: string;

  @Expose({ name: 'requirements', toPlainOnly: true })
  call_to_action: string;

  @Exclude({ toPlainOnly: true })
  disclaimer: string;

  @Expose({ name: 'offerUrlTemplate', toPlainOnly: true })
  offer_url: string;

  @Exclude({ toPlainOnly: true })
  offer_url_easy: string;

  @Exclude({ toPlainOnly: true })
  payout: number;

  @Exclude({ toPlainOnly: true })
  payout_type: string;

  @Exclude({ toPlainOnly: true })
  amount: number;

  @Expose({ name: 'thumbnail', toPlainOnly: true })
  image_url: string;

  @Exclude({ toPlainOnly: true })
  image_url_220x124: string;

  @Exclude({ toPlainOnly: true })
  countries: string[];

  @Expose({ name: 'isDesktop', toPlainOnly: true })
  @Transform(({ value }) => Number(value === 'desktop'), { toPlainOnly: true })
  platform: 'mobile' | 'desktop';

  @Expose({ name: 'isIos', toPlainOnly: true })
  @Transform(({ value }) => Number(value === 'iphone_ipad'), {
    toPlainOnly: true,
  })
  device: string;

  @Exclude({ toPlainOnly: true })
  category: { [key: string]: string };

  @Exclude({ toPlainOnly: true })
  last_modified: number;

  @Exclude({ toPlainOnly: true })
  preview_url: string;

  @Exclude({ toPlainOnly: true })
  package_id: string;

  @Exclude({ toPlainOnly: true })
  verticals: OfferVertical[];
}

class OfferResponse {
  @Exclude({ toPlainOnly: true })
  currency_name: string;

  @Exclude({ toPlainOnly: true })
  offers_count: number;

  @Type(() => OfferData)
  @IsArray({ each: true })
  offers: OfferData[];
}
export class OfferProvider1DTO {
  @Exclude({ toPlainOnly: true })
  @Type(() => OfferQuery)
  query: OfferQuery;

  @Type(() => OfferResponse)
  response: OfferResponse;
}
