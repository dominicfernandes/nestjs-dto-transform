import {
  Exclude,
  Expose,
  Transform,
  Type,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

class OfferData {
  @Expose({ name: 'externalOfferId', toPlainOnly: true })
  @Transform(({ value }) => value.toString())
  campaign_id: number;

  @Exclude({ toPlainOnly: true })
  store_id: string | null;

  @Exclude({ toPlainOnly: true })
  tracking_type: string;

  @Exclude({ toPlainOnly: true })
  campaign_vertical: string;

  @Exclude({ toPlainOnly: true })
  currency_name_singular: string;

  @Exclude({ toPlainOnly: true })
  currency_name_plural: string;

  @Exclude({ toPlainOnly: true })
  network_epc: string;

  @Expose({ name: 'thumbnail', toPlainOnly: true })
  icon: string;

  name: string;

  @Expose({ name: 'offerUrlTemplate', toPlainOnly: true })
  tracking_url: string;

  @Expose({ name: 'requirements', toPlainOnly: true })
  instructions: string;

  @Exclude({ toPlainOnly: true })
  disclaimer: null;

  @Exclude({ toPlainOnly: true })
  description: string;

  @Exclude({ toPlainOnly: true })
  short_description: string;

  @Exclude({ toPlainOnly: true })
  offer_sticker_text_1: string;

  @Exclude({ toPlainOnly: true })
  offer_sticker_text_2: string | null;

  @Exclude({ toPlainOnly: true })
  offer_sticker_text_3: string | null;

  @Exclude({ toPlainOnly: true })
  offer_sticker_color_1: string;

  @Exclude({ toPlainOnly: true })
  offer_sticker_color_2: string;

  @Exclude({ toPlainOnly: true })
  offer_sticker_color_3: string;

  @Exclude({ toPlainOnly: true })
  sort_order_setting: string | null;

  @Exclude({ toPlainOnly: true })
  category_1: string;

  @Exclude({ toPlainOnly: true })
  category_2: string | null;

  @Exclude({ toPlainOnly: true })
  amount: number;

  @Exclude({ toPlainOnly: true })
  payout_usd: number;

  @Exclude({ toPlainOnly: true })
  start_datetime: string;

  @Exclude({ toPlainOnly: true })
  end_datetime: string;

  @Exclude({ toPlainOnly: true })
  is_multi_reward: boolean;
}

class OfferOS {
  @Expose({ name: 'isAndroid', toPlainOnly: true })
  @Transform(({ value }) => Number(value))
  android: boolean;

  @Expose({ name: 'isIos', toPlainOnly: true })
  @Transform(({ value }) => Number(value))
  ios: boolean;

  @Expose({ name: 'isDesktop', toPlainOnly: true })
  @Transform(({ value }) => Number(value))
  web: boolean;

  @Exclude({ toPlainOnly: true })
  min_ios: string | null;

  @Exclude({ toPlainOnly: true })
  max_ios: string | null;

  @Exclude({ toPlainOnly: true })
  min_android: string | null;

  @Exclude({ toPlainOnly: true })
  max_android: string | null;
}

class OfferCountry {
  @Exclude({ toPlainOnly: true })
  include: {
    US: {
      id: number;
      code: string;
      name: string;
    };
  };
  @Exclude({ toPlainOnly: true })
  exclude: [];
}

export class OfferResponseProvider2 {
  @Type(() => OfferData)
  @Transform((data) => ({
    ...data.value,
    ...instanceToPlain(plainToInstance(OfferOS, data.obj.OS)),
  }))
  @Expose({ name: 'offer', toPlainOnly: true })
  Offer: OfferData;

  @Exclude({ toPlainOnly: true })
  Country: OfferCountry;

  @Exclude({ toPlainOnly: true })
  State: {
    include: string[];
    exclude: string[];
  };

  @Exclude({ toPlainOnly: true })
  City: {
    include: string[];
    exclude: string[];
  };

  @Exclude({ toPlainOnly: true })
  Connection_Type: {
    cellular: boolean;
    wifi: boolean;
  };

  @Exclude({ toPlainOnly: true })
  Device: {
    include: string[];
    exclude: string[];
  };

  @Type(() => OfferOS)
  @Exclude({ toPlainOnly: true })
  OS: OfferOS;
}
class ResponseData {
  [key: string]: OfferResponseProvider2;
}

export class OfferProvider2DTO {
  status: string;

  @Type(() => ResponseData)
  @Transform(
    (data) => {
      const offerIds = Object.keys(data.value);
      return offerIds.map((offerId) => ({
        ...data.value[offerId],
      }));
    },
    { toPlainOnly: true },
  )
  data: ResponseData;
}
