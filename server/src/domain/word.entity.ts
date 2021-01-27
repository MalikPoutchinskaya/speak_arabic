/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Category from './category.entity';
import Country from './country.entity';
import ArabicSound from './arabic-sound.entity';

/**
 * A Word.
 */
@Entity('word')
export default class Word extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToMany(type => Category)
  @JoinTable({
    name: 'word_category',
    joinColumn: { name: 'word_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  categories: Category[];

  @ManyToOne(type => Country, country => country.words,{onDelete:'CASCADE'})
  country: Country;

  @ManyToMany(type => ArabicSound)
  @JoinTable()
  arabicSounds: ArabicSound[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
