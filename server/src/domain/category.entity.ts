/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Word from './word.entity';

/**
 * A Category.
 */
@Entity('category')
export default class Category extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToMany(type => Word)
  @JoinTable()
  words: Word[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
