import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ArabicSound from '../domain/arabic-sound.entity';
import { ArabicSoundRepository } from '../repository/arabic-sound.repository';

const relationshipNames = [];
relationshipNames.push('words');

@Injectable()
export class ArabicSoundService {
  logger = new Logger('ArabicSoundService');

  constructor(@InjectRepository(ArabicSoundRepository) private arabicSoundRepository: ArabicSoundRepository) {}

  async findById(id: string): Promise<ArabicSound | undefined> {
    const options = { relations: relationshipNames };
    return await this.arabicSoundRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ArabicSound>): Promise<ArabicSound | undefined> {
    return await this.arabicSoundRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<ArabicSound>): Promise<[ArabicSound[], number]> {
    options.relations = relationshipNames;
    return await this.arabicSoundRepository.findAndCount(options);
  }

  async save(arabicSound: ArabicSound): Promise<ArabicSound | undefined> {
    return await this.arabicSoundRepository.save(arabicSound);
  }

  async update(arabicSound: ArabicSound): Promise<ArabicSound | undefined> {
    return await this.save(arabicSound);
  }

  async delete(arabicSound: ArabicSound): Promise<ArabicSound | undefined> {
    return await this.arabicSoundRepository.remove(arabicSound);
  }
}
