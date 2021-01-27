import { IWord } from 'app/shared/model/word.model';

export interface ICategory {
  id?: number;
  name?: string;
  words?: IWord[];
}

export const defaultValue: Readonly<ICategory> = {};
