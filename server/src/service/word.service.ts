import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Word from '../domain/word.entity';
import { WordRepository } from '../repository/word.repository';

const relationshipNames = [];
relationshipNames.push('categories');
relationshipNames.push('country');

@Injectable()
export class WordService {
  logger = new Logger('WordService');

  constructor(@InjectRepository(WordRepository) private wordRepository: WordRepository) {}

  async findById(id: string): Promise<Word | undefined> {
    const options = { relations: relationshipNames };
    return await this.wordRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Word>): Promise<Word | undefined> {
    return await this.wordRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Word>): Promise<[Word[], number]> {
    options.relations = relationshipNames;
    return await this.wordRepository.findAndCount(options);
  }

  async save(word: Word): Promise<Word | undefined> {
    return await this.wordRepository.save(word);
  }

  async update(word: Word): Promise<Word | undefined> {
    return await this.save(word);
  }

  async delete(word: Word): Promise<Word | undefined> {
    return await this.wordRepository.remove(word);
  }
}
