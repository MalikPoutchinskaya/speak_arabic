import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Word from '../../domain/word.entity';
import { WordService } from '../../service/word.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/words')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('words')
export class WordController {
  logger = new Logger('WordController');

  constructor(private readonly wordService: WordService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Word
  })
  async getAll(@Req() req: Request): Promise<Word[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.wordService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Word
  })
  async getOne(@Param('id') id: string): Promise<Word> {
    return await this.wordService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create word' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Word
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() word: Word): Promise<Word> {
    const created = await this.wordService.save(word);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Word', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update word' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Word
  })
  async put(@Req() req: Request, @Body() word: Word): Promise<Word> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Word', word.id);
    return await this.wordService.update(word);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete word' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Word> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Word', id);
    const toDelete = await this.wordService.findById(id);
    return await this.wordService.delete(toDelete);
  }
}
