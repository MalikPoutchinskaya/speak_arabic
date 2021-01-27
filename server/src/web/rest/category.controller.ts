import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Category from '../../domain/category.entity';
import { CategoryService } from '../../service/category.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/categories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('categories')
export class CategoryController {
  logger = new Logger('CategoryController');

  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Category
  })
  async getAll(@Req() req: Request): Promise<Category[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.categoryService.findAndCount({
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
    type: Category
  })
  async getOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create category' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Category
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() category: Category): Promise<Category> {
    const created = await this.categoryService.save(category);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Category', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update category' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Category
  })
  async put(@Req() req: Request, @Body() category: Category): Promise<Category> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Category', category.id);
    return await this.categoryService.update(category);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete category' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Category> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Category', id);
    const toDelete = await this.categoryService.findById(id);
    return await this.categoryService.delete(toDelete);
  }
}
