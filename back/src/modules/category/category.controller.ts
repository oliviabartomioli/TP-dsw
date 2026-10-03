import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category-dto';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('createCategory')
  createCategory(@Body() category: categoryDto) {
    return this.categoryService.createCategory(category);
  }
  @Get()
  getCategory() {
    return this.categoryService.findAll();
  }
  @Get('delete/deleted')
  getCategoryDeleted() {
    return this.categoryService.findAllDelete();
  }
  @Put()
  updateCategory(@Body() category: categoryDto) {
    return this.categoryService.updateCategory(category);
  }
  @Delete('/:idCategory')
  deleteCategory(@Param('idCategory') idCategory: number) {
    return this.categoryService.deleteCategory(idCategory);
  }
  @Patch('/restore/:idCategory')
  restoreCategory(@Param('idCategory') idCategory: number) {
    return this.categoryService.restoreCategory(idCategory);
  }
}
