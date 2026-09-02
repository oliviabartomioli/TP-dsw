import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoryDto } from './dto/category-dto';
import { category } from './entity/category.entity';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class CategoryService {
  findAllDeleted() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(category)
    private categoryRepository: Repository<category>,
  ) {}

  async createCategory(category: categoryDto) {
    const CategoryExists = await this.findCategory(category.idCategory);
    if (CategoryExists) {
      throw new ConflictException('categoría ya registrada');
    } else {
      return await this.categoryRepository.save(category);
    }
  }
  async findCategory(idCategory: number) {
    return await this.categoryRepository.findOne({ where: { idCategory } });
  }
  async findAll() {
    return await this.categoryRepository.find({ where: { deleteC: false } });
  }
  async findAllDelete() {
    return await this.categoryRepository.find({ where: { deleteC: true } });
  }
  async deleteCategory(idCategory: number) {
    const CategoryExists = await this.findCategory(idCategory);
    if (!CategoryExists) {
      throw new ConflictException(
        'La categoria con id:' + idCategory + 'no existe',
      );
    }
    if (CategoryExists.deleteC) {
      throw new ConflictException(
        'La categoria con id' + idCategory + 'esta eliminada',
      );
    }
    const rows: UpdateResult = await this.categoryRepository.update(
      { idCategory },
      { deleteC: true },
    );
    return rows.affected == 1;
  }
  async restoreCategory(idCategory: number) {
    const CategoryExists = await this.findCategory(idCategory);

    if (!CategoryExists) {
      throw new ConflictException(
        'La categoria con idCategory ' + idCategory + ' no existe',
      );
    }
    if (!CategoryExists) {
      throw new ConflictException('la categoria no esta eliminada');
    }

    const rows: UpdateResult = await this.categoryRepository.update(
      { idCategory },
      { deleteC: false },
    );
    return rows.affected == 1;
  }
}
