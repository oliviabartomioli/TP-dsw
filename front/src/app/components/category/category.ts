import { Component, OnInit } from '@angular/core';
import { Category, categoryDto } from '../../models/category.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-category',
  standalone: true,
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class CategoryComponents implements OnInit {

  Categorys: Category[] = [];
  deletedCategorys: Category[] = [];
  categoryForm!: FormGroup;
  isEditMode = false;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.loadCategorys();
  }
  initForm(): void {
  this.categoryForm = this.fb.group({
    idCategory: ['', [Validators.required, Validators.min(1)]],
    nameC: ['', [Validators.required, Validators.maxLength(15)]],
    descriptionC: ['', [Validators.required, Validators.maxLength(100)]],
    deleteC: [false]
  });
}

loadCategorys(): void {
  this.loading = true;
  this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.Categorys= data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'error al cargar categorias';
        this.loading = false;
    }
  });
}

  loadDeletedCategory(): void {
    this.categoryService.getCategoryDelete().subscribe({
      next: (data) => {
        this.deletedCategorys = data;
      },
      error: (err) => {
        this.errorMessage = 'error al cargar categorias eliminadas';
      }
    })
  }

  onSubmit(): void {
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }
    const dto: categoryDto = this.categoryForm.value;

    if(this.isEditMode){
      this.categoryService.upDateCategory(dto).subscribe({

        next: () => {
          this.resetForm();
          this.loadDeletedCategory();
        }
      })
    }
  }
}
