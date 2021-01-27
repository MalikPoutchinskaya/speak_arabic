import { ICategory } from 'app/shared/model/category.model';
import { ICountry } from 'app/shared/model/country.model';
import { IArabicSound } from 'app/shared/model/arabic-sound.model';

export interface IWord {
  id?: number;
  name?: string;
  categories?: ICategory[];
  country?: ICountry;
  arabicSounds?: IArabicSound[];
}

export const defaultValue: Readonly<IWord> = {};
