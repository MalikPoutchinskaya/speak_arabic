import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ArabicSound from '../../domain/arabic-sound.entity';
import { ArabicSoundService } from '../../service/arabic-sound.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/arabic-sounds')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('arabic-sounds')
export class ArabicSoundController {
  logger = new Logger('ArabicSoundController');

  constructor(private readonly arabicSoundService: ArabicSoundService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ArabicSound
  })
  async getAll(@Req() req: Request): Promise<ArabicSound[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.arabicSoundService.findAndCount({
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
    type: ArabicSound
  })
  async getOne(@Param('id') id: string): Promise<ArabicSound> {
    return await this.arabicSoundService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create arabicSound' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ArabicSound
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() arabicSound: ArabicSound): Promise<ArabicSound> {
    const created = await this.arabicSoundService.save(arabicSound);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ArabicSound', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update arabicSound' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ArabicSound
  })
  async put(@Req() req: Request, @Body() arabicSound: ArabicSound): Promise<ArabicSound> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ArabicSound', arabicSound.id);
    return await this.arabicSoundService.update(arabicSound);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete arabicSound' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ArabicSound> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ArabicSound', id);
    const toDelete = await this.arabicSoundService.findById(id);
    return await this.arabicSoundService.delete(toDelete);
  }
}
