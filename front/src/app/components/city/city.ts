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

import { City, cityDto } from '../../models/city.model';
import { Province } from '../../models/province.model';
import { CityService } from '../../services/city';
import { ProvinceService } from '../../services/province';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-city',
  standalone: true,
  styleUrl: './city.css',
  templateUrl: './city.html',
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  deletedCities: City[] = [];
  provinces: Province[] = [];

  cityForm!: FormGroup;

  isEditMode = false;
  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private provinceService: ProvinceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCities();
    this.loadProvinces();
  }

  initForm(): void {
    this.cityForm = this.fb.group({
      idCity: ['', [Validators.required, Validators.min(1)]],
      nameCity: ['', [Validators.required, Validators.maxLength(15)]],
      idProvince: ['', [Validators.required]],
      deleteCity: [false],
    });
  }

  loadCities(): void {
    this.loading = true;

    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar ciudades';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadProvinces(): void {
    this.provinceService.getProvinces().subscribe({
      next: (data) => {
        console.log('PROVINCIAS:', data);
        this.provinces = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar provincias';
        this.cdr.detectChanges();
      },
    });
  }

  loadDeletedCities(): void {
    this.cityService.getCitiesDeleted().subscribe({
      next: (data) => {
        this.deletedCities = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar ciudades eliminadas';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const dto: cityDto = this.cityForm.getRawValue();

    if (this.isEditMode) {
      this.cityService.updateCity(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadCities();
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar ciudad';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.cityService.createCity(dto).subscribe({
        next: () => {
          this.resetForm();
          this.loadCities();
        },
        error: (err) => {
          this.errorMessage = 'Error al crear ciudad';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(city: City): void {
    this.isEditMode = true;

    this.cityForm.patchValue({
      idCity: city.idCity,
      nameCity: city.nameCity,
      idProvince: city.province?.idProvince,
      deleteCity: city.deleteCity ?? false,
    });

    this.cityForm.get('idCity')?.disable();
  }

  onDelete(nameCity: string): void {
    if (
      confirm(
        `¿Seguro que desea eliminar la ciudad ${nameCity}?`
      )
    ) {
      this.cityService.deleteCity(nameCity).subscribe({
        next: () => {
          this.loadCities();

          if (this.showDeleted) {
            this.loadDeletedCities();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar ciudad';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onRestore(nameCity: string): void {
    this.cityService.restoreCity(nameCity).subscribe({
      next: () => {
        this.loadCities();
        this.loadDeletedCities();
      },
      error: (err) => {
        this.errorMessage = 'Error al restaurar ciudad';
        this.cdr.detectChanges();
      },
    });
  }

  toggleDeletedView(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedCities();
    }
  }

  resetForm(): void {
    this.isEditMode = false;

    this.cityForm.reset({
      deleteCity: false,
    });

    this.cityForm.get('idCity')?.enable();
  }
}