import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Category from '../domain/category.entity';
import { CategoryRepository } from '../repository/category.repository';

const relationshipNames = [];

@Injectable()
export class CategoryService {
  logger = new Logger('CategoryService');

  constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {}

  async findById(id: string): Promise<Category | undefined> {
    const options = { relations: relationshipNames };
    return await this.categoryRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Category>): Promise<Category | undefined> {
    return await this.categoryRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Category>): Promise<[Category[], number]> {
    options.relations = relationshipNames;
    return await this.categoryRepository.findAndCount(options);
  }

  async save(category: Category): Promise<Category | undefined> {
    return await this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category | undefined> {
    return await this.save(category);
  }

  async delete(category: Category): Promise<Category | undefined> {
    return await this.categoryRepository.remove(category);
  }
}
