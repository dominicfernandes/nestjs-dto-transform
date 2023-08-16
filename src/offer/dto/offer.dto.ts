import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { IOffer } from '../interface/offer.interface';

class OfferBaseDTO implements IOffer {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  isDesktop: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  isAndroid: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  isIos: number;

  @IsString()
  @IsNotEmpty()
  offerUrlTemplate: string;

  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsString()
  @IsNotEmpty()
  externalOfferId: string;
}

export class OfferDTO extends OmitType(OfferBaseDTO, ['id'] as const) {}
