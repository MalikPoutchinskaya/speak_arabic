import { EntityRepository, Repository } from 'typeorm';
import Word from '../domain/word.entity';

@EntityRepository(Word)
export class WordRepository extends Repository<Word> {}
