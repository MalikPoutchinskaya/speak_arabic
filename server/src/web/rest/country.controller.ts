import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Country from '../../domain/country.entity';
import { CountryService } from '../../service/country.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/countries')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('countries')
export class CountryController {
  logger = new Logger('CountryController');

  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Country
  })
  async getAll(@Req() req: Request): Promise<Country[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.countryService.findAndCount({
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
    type: Country
  })
  async getOne(@Param('id') id: string): Promise<Country> {
    return await this.countryService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create country' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Country
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() country: Country): Promise<Country> {
    const created = await this.countryService.save(country);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Country', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update country' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Country
  })
  async put(@Req() req: Request, @Body() country: Country): Promise<Country> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Country', country.id);
    return await this.countryService.update(country);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete country' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Country> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Country', id);
    const toDelete = await this.countryService.findById(id);
    return await this.countryService.delete(toDelete);
  }
}
