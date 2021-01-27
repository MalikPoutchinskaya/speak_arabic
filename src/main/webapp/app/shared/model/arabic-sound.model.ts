import { IWord } from 'app/shared/model/word.model';

export interface IArabicSound {
  id?: number;
  name?: string;
  description?: string;
  words?: IWord[];
}

export const defaultValue: Readonly<IArabicSound> = {};
