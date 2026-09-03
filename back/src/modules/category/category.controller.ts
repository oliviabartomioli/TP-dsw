import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category-dto';

@Controller('category')
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
  @Delete('/:idCategory')
  deleteCategory(@Param('idCategory') idCategory: number) {
    return this.categoryService.deleteCategory(idCategory);
  }
  @Patch('/restore/:idCategory')
  restoreCategory(@Param('idCategory') idCategory: number) {
    return this.categoryService.restoreCategory(idCategory);
  }
}
