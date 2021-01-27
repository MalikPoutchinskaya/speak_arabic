/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Word from './word.entity';

/**
 * A ArabicSound.
 */
@Entity('arabic_sound')
export default class ArabicSound extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @ManyToMany(type => Word)
  @JoinTable({
    name: 'arabic_sound_word',
    joinColumn: { name: 'arabic_sound_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'word_id', referencedColumnName: 'id' }
  })
  words: Word[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
