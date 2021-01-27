import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArabicSoundController } from '../web/rest/arabic-sound.controller';
import { ArabicSoundRepository } from '../repository/arabic-sound.repository';
import { ArabicSoundService } from '../service/arabic-sound.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArabicSoundRepository])],
  controllers: [ArabicSoundController],
  providers: [ArabicSoundService],
  exports: [ArabicSoundService]
})
export class ArabicSoundModule {}
