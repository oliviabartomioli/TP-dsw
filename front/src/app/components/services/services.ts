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

import { Services, servicesDto } from '../../models/services.model';
import { Category } from '../../models/category.model';
import { ServiceService } from '../../services/services';
import { CategoryService } from '../../services/category';
import { Professional } from '../../models/professional.model';
import { ProfessionalService } from '../../services/professional';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-services',
  standalone: true,
  styleUrl: './services.css',
  templateUrl: './services.html',
})
export class ServicesComponents implements OnInit {
  services: Services[] = [];
  deleteService: Services[] = [];
  categories: Category[] = [];
  professionals: Professional[] = [];
  servicesForm!: FormGroup;
  isEditMode = false;
  selectedServiceId: number | null = null;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
  private fb: FormBuilder,
  private servicesService: ServiceService,
  private categoryService: CategoryService,
  private professionalService: ProfessionalService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  this.initForm();
  this.loadServices();
  this.loadCategories();
  this.loadProfessionals();
}

 initForm(): void {
  this.servicesForm = this.fb.group({
    nameS: ['', [Validators.required, Validators.maxLength(30)]],
    descriptionS: ['', [Validators.required, Validators.maxLength(150)]],
    idCategory: ['', [Validators.required]],
    dniP: [null, [Validators.required, Validators.min(1)]],
  });
}

  loadServices(): void {
    this.loading = true;

    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar servicios';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar categorías';
        this.cdr.detectChanges();
      },
    });
  }

  loadProfessionals(): void {
  this.professionalService.getProfessional().subscribe({
    next: (data) => {
      this.professionals = data;
      this.cdr.detectChanges();
    },
    error: () => {
      this.errorMessage = 'Error al cargar profesionales';
      this.cdr.detectChanges();
    },
  });
}

  loadDeletedService(): void {
    this.servicesService.getServicesDelete().subscribe({
      next: (data) => {
        this.deleteService = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar servicios eliminados';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.servicesForm.invalid) {
      this.servicesForm.markAllAsTouched();
      return;
    }

    const dto: servicesDto = this.servicesForm.getRawValue();

    if (this.isEditMode) {
      if (this.selectedServiceId === null) {
        return;
      }

      const updateDto: servicesDto = {
        ...dto,
        idService: this.selectedServiceId,
      };

      this.servicesService.upDateServices(updateDto).subscribe({
        next: () => {
          this.resetForm();
          this.loadServices();
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar servicio';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.servicesService.createServices(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadServices();
        },
        error: (err) => {
          this.errorMessage = 'Error al crear servicio';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(service: Services): void {
  this.isEditMode = true;
  this.selectedServiceId = service.idService;

  this.servicesForm.patchValue({
    nameS: service.nameS,
    descriptionS: service.descriptionS,
    idCategory: service.category?.idCategory,
    dniP: service.professional?.dniP ?? null,
  });
}

  onDelete(idService: number): void {
    if (confirm(`¿Deseas eliminar el servicio ID: ${idService}?`)) {
      this.servicesService.deleteServices(idService).subscribe({
        next: () => {
          this.loadServices();

          if (this.showDeleted) {
            this.loadDeletedService();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar el servicio';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onRestore(idService: number): void {
    this.servicesService.restoreServices(idService).subscribe({
      next: () => {
        this.loadServices();
        this.loadDeletedService();
      },
      error: (err) => {
        this.errorMessage = 'Error al restaurar el servicio';
        this.cdr.detectChanges();
      },
    });
  }

  toggleDeletedView(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedService();
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedServiceId = null;
    this.servicesForm.reset();
  }
}
