/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';

import Word from './word.entity';

/**
 * A Country.
 */
@Entity('country')
export default class Country extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'flag_url' })
  flagUrl: string;

  @OneToMany(
    type => Word,
    word => word.country,
    {cascade: true}
  )
  words: Word[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
