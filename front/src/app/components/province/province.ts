import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Province, provinceDto } from '../../models/province.model';
import { ProvinceService } from '../../services/province';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-province',
  standalone: true,
  styleUrl: './province.css',
  templateUrl: './province.html',
})
export class ProvinceComponent implements OnInit {
  provinces: Province[] = [];
  deletedProvinces: Province[] = [];
  provinceForm!: FormGroup;
  isEditMode = false;
  selectedProvinceId: number | null = null;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProvinces();
  }

  initForm(): void {
    this.provinceForm = this.fb.group({
      nameProvince: ['', [Validators.required, Validators.maxLength(30)]],
      deleteProvince: [false],
    });
  }

  loadProvinces(): void {
    this.loading = true;

    this.provinceService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar provincias';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadDeletedProvinces(): void {
    this.provinceService.getProvincesDeleted().subscribe({
      next: (data) => {
        this.deletedProvinces = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar provincias eliminadas';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.provinceForm.invalid) {
      this.provinceForm.markAllAsTouched();
      return;
    }

    const dto: provinceDto = this.provinceForm.getRawValue();

    if (this.isEditMode) {
      if (this.selectedProvinceId === null) {
        return;
      }

      const updateDto: provinceDto = {
        ...dto,
        idProvince: this.selectedProvinceId,
      };

      this.provinceService.updateProvince(updateDto).subscribe({
        next: () => {
          this.resetForm();
          this.loadProvinces();
        },
        error: (err) => {
          console.error('ERROR UPDATE PROVINCE:', err);
          this.errorMessage = 'Error al actualizar provincia';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.provinceService.createProvince(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadProvinces();
        },
        error: (err) => {
          console.error('ERROR CREATE PROVINCE:', err);
          this.errorMessage = 'Error al crear provincia';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(province: Province): void {
    this.isEditMode = true;
    this.selectedProvinceId = province.idProvince;

    this.provinceForm.patchValue({
      nameProvince: province.nameProvince,
      deleteProvince: province.deleteProvince ?? false,
    });
  }

  onDelete(nameProvince: string): void {
    if (
      confirm(
        `¿Seguro que desea eliminar la provincia ${nameProvince}?`
      )
    ) {
      this.provinceService.deleteProvince(nameProvince).subscribe({
        next: () => {
          this.loadProvinces();

          if (this.showDeleted) {
            this.loadDeletedProvinces();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar provincia';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onRestore(nameProvince: string): void {
    this.provinceService.restoreProvince(nameProvince).subscribe({
      next: () => {
        this.loadProvinces();
        this.loadDeletedProvinces();
      },
      error: (err) => {
        this.errorMessage = 'Error al restaurar provincia';
        this.cdr.detectChanges();
      },
    });
  }

  toggleDeletedView(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedProvinces();
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedProvinceId = null;
    this.provinceForm.reset({
      deleteProvince: false,
    });
  }
}