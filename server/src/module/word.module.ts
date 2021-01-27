import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordController } from '../web/rest/word.controller';
import { WordRepository } from '../repository/word.repository';
import { WordService } from '../service/word.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordRepository])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService]
})
export class WordModule {}
