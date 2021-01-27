import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Country from '../domain/country.entity';
import { CountryRepository } from '../repository/country.repository';

const relationshipNames = [];

@Injectable()
export class CountryService {
  logger = new Logger('CountryService');

  constructor(@InjectRepository(CountryRepository) private countryRepository: CountryRepository) {}

  async findById(id: string): Promise<Country | undefined> {
    const options = { relations: relationshipNames };
    return await this.countryRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Country>): Promise<Country | undefined> {
    return await this.countryRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Country>): Promise<[Country[], number]> {
    options.relations = relationshipNames;
    return await this.countryRepository.findAndCount(options);
  }

  async save(country: Country): Promise<Country | undefined> {
    return await this.countryRepository.save(country);
  }

  async update(country: Country): Promise<Country | undefined> {
    return await this.save(country);
  }

  async delete(country: Country): Promise<Country | undefined> {
    return await this.countryRepository.remove(country);
  }
}
