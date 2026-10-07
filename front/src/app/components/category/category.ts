import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category, categoryDto } from '../../models/category.model';
import { CategoryService } from '../../services/category';
import { Professional } from '../../models/professional.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-category',
  standalone: true,
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class CategoryComponents implements OnInit {

  Categories: Category[] = [];
  deletedCategorys: Category[] = [];
  categoryForm!: FormGroup;
  isEditMode = false;
  selectedCategoryId: number | null = null;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategorys();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      nameC: ['', [Validators.required, Validators.maxLength(15)]],
      descriptionC: ['', [Validators.required, Validators.maxLength(100)]],
      deleteC: [false],
    });
  }

  loadCategorys(): void {
  this.loading = true;

  this.categoryService.getCategory().subscribe({
    next: (data) => {
      this.Categories = data;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      this.errorMessage = 'error al cargar categorias';
      this.loading = false;
      this.cdr.detectChanges();
    },
  });
}

  loadDeletedCategory(): void {
  this.categoryService.getCategoryDelete().subscribe({
    next: (data) => {
      this.deletedCategorys = data;
      this.cdr.detectChanges();
    },
    error: (err) => {
      this.errorMessage = 'error al cargar categorias eliminadas';
      this.cdr.detectChanges();
    },
  });
}

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const dto: categoryDto = this.categoryForm.getRawValue();

    if (this.isEditMode) {
      if (this.selectedCategoryId === null) {
        return;
      }

      const updateDto: categoryDto = {
        ...dto,
        idCategory: this.selectedCategoryId,
      };

      this.categoryService.upDateCategory(updateDto).subscribe({
        next: () => {
          this.resetForm();
          this.loadCategorys();
        },
        error: (err) => {
          console.error('ERROR UPDATE CATEGORY:', err);
          this.errorMessage = 'error al actualizar categoria';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.categoryService.createCategory(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadCategorys();
        },
        error: (err) => {
          console.error('ERROR CREATE CATEGORY:', err);
          this.errorMessage = 'error al crear categoria';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(category: Category): void {
    this.isEditMode = true;
    this.selectedCategoryId = category.idCategory;

    this.categoryForm.patchValue({
      nameC: category.nameC,
      descriptionC: category.descriptionC,
      deleteC: category.deleteC ?? false,
    });
  }

  onDelete(idCategory: number): void {
    if (
      confirm(
        `Seguro que desea eliminar la categoria con ID: ${idCategory}?`
      )
    ) {
      this.categoryService.deleteCategory(idCategory).subscribe({
        next: () => {
          this.loadCategorys();

          if (this.showDeleted) {
            this.loadDeletedCategory();
          }
        },
        error: (err) => {
          this.errorMessage = 'error al eliminar categoria';
        },
      });
    }
  }

  onRestore(idCategory: number): void {
    this.categoryService.restoreCategory(idCategory).subscribe({
      next: () => {
        this.loadCategorys();
        this.loadDeletedCategory();
      },
      error: (err) => {
        this.errorMessage = 'error al restaurar categoria';
      },
    });
  }

  toggleDeletedView(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedCategory();
    }
  }

 resetForm(): void {
    this.isEditMode = false;
    this.selectedCategoryId = null;

    this.categoryForm.reset({
      deleteC: false,
    });
  }
}