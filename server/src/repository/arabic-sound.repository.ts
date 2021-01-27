import { EntityRepository, Repository } from 'typeorm';
import ArabicSound from '../domain/arabic-sound.entity';

@EntityRepository(ArabicSound)
export class ArabicSoundRepository extends Repository<ArabicSound> {}
