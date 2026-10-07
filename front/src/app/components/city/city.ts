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
  selectedCityId: number | null = null;
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
      if (this.selectedCityId === null) {
        return;
      }

      const updateDto: cityDto = {
        ...dto,
        idCity: this.selectedCityId,
      };

      this.cityService.updateCity(updateDto).subscribe({
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
    this.selectedCityId = city.idCity;

    this.cityForm.patchValue({
      nameCity: city.nameCity,
      idProvince: city.province?.idProvince,
      deleteCity: city.deleteCity ?? false,
    });
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
    this.selectedCityId = null;

    this.cityForm.reset({
      deleteCity: false,
    });
  }
}