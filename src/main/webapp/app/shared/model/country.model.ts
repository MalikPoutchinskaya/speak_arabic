import { IWord } from 'app/shared/model/word.model';

export interface ICountry {
  id?: number;
  name?: string;
  flagUrl?: string;
  words?: IWord[];
}

export const defaultValue: Readonly<ICountry> = {};
