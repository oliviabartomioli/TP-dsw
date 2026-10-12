
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Services } from '../../models/services.model';
import { Category } from '../../models/category.model';
import { City } from '../../models/city.model';
import { ServiceService } from '../../services/services';
import { CategoryService } from '../../services/category';
import { CityService } from '../../services/city';
import { DetalleServicioComponent } from '../detalle-servicio/detalle-servicio';

@Component({
  selector: 'app-buscar-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, DetalleServicioComponent],
  templateUrl: './buscar-servicios.html',
  styleUrl: './buscar-servicios.css',
})
export class BuscarServiciosComponent implements OnInit {
  services: Services[] = [];
  categories: Category[] = [];
  cities: City[] = [];

  selectedCategory: number | null = null;
  selectedCity: number | null = null;

  selectedService: Services | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private servicesService: ServiceService,
    private categoryService: CategoryService,
    private cityService: CityService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCities();
    this.loadServices();
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar categorías';
        this.cdr.detectChanges();
      },
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar ciudades';
        this.cdr.detectChanges();
      },
    });
  }

  loadServices(): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedService = null;

    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar servicios';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  searchByCategory(): void {
    if (this.selectedCategory === null) {
      return;
    }

    this.selectedCity = null;
    this.selectedService = null;
    this.loading = true;
    this.errorMessage = '';

    this.servicesService
      .getServicesByCategory(this.selectedCategory)
      .subscribe({
        next: (data) => {
          this.services = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Error al buscar servicios por categoría';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  searchByCity(): void {
    if (this.selectedCity === null) {
      return;
    }

    this.selectedCategory = null;
    this.selectedService = null;
    this.loading = true;
    this.errorMessage = '';

    this.servicesService
      .getServicesByCity(this.selectedCity)
      .subscribe({
        next: (data) => {
          this.services = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Error al buscar servicios por ciudad';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }

  viewDetail(idService: number): void {
    this.errorMessage = '';

    this.servicesService.getServicesById(idService).subscribe({
      next: (data) => {
        this.selectedService = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar el detalle del servicio';
        this.cdr.detectChanges();
      },
    });
  }

  closeDetail(): void {
    this.selectedService = null;
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedCity = null;
    this.loadServices();
  }
}
