
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Favorite, FavoriteDto } from '../../models/favorite.model';
import { favoriteServices } from '../../services/favorite';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-favorite',
  standalone: true,
  styleUrl: './favorite.css',
  templateUrl: './favorite.html',
})
export class FavoriteComponent implements OnInit {
  favorites: Favorite[] = [];
  deletedFavorites: Favorite[] = [];
  favoriteForm!: FormGroup;

  showDeleted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private favoriteService: favoriteServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFavorites();
  }

  initForm(): void {
    this.favoriteForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      dniUs: [null, Validators.required],
      dniP: [null, Validators.required],
    });
  }

  loadFavorites(): void {
    this.loading = true;

    this.favoriteService.getFavorite().subscribe({
      next: (data) => {
        this.favorites = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar favoritos';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadDeletedFavorites(): void {
    this.favoriteService.getFavoriteDelete().subscribe({
      next: (data) => {
        this.deletedFavorites = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar favoritos eliminados';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.favoriteForm.invalid) {
      this.favoriteForm.markAllAsTouched();
      return;
    }

    const dto: FavoriteDto = {
      date: this.favoriteForm.value.date,
      dniUs: Number(this.favoriteForm.value.dniUs),
      dniP: Number(this.favoriteForm.value.dniP),
    };

    this.favoriteService.createFavorite(dto).subscribe({
      next: () => {
        this.favoriteForm.reset({
          date: new Date().toISOString().split('T')[0],
          dniUs: null,
          dniP: null,
        });
        this.errorMessage = '';
        this.loadFavorites();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Error al crear favorito';
        this.cdr.detectChanges();
      },
    });
  }

  onDelete(idfav: number): void {
    if (!confirm('¿Eliminar este favorito?')) return;

    this.favoriteService.deleteFavorite(idfav).subscribe({
      next: () => {
        this.loadFavorites();
        if (this.showDeleted) this.loadDeletedFavorites();
      },
      error: () => {
        this.errorMessage = 'Error al eliminar favorito';
        this.cdr.detectChanges();
      },
    });
  }

  onRestore(idfav: number): void {
    this.favoriteService.restoreFavorite(idfav).subscribe({
      next: () => {
        this.loadFavorites();
        this.loadDeletedFavorites();
      },
      error: () => {
        this.errorMessage = 'Error al restaurar favorito';
        this.cdr.detectChanges();
      },
    });
  }

  toggleDeleted(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedFavorites();
    }
  }
}

