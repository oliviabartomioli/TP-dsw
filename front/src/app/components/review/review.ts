
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

import { Review, ReviewDto } from '../../models/review.model';
import { ReviewService } from '../../services/review';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  deletedReviews: Review[] = [];

  reviewForm!: FormGroup;

  editing = false;
  editingId: number | null = null;
  showDeleted = false;
  loading = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadReviews();
  }

  initForm(): void {
    this.reviewForm = this.fb.group({
      commentR: [
        '',
        [Validators.required, Validators.maxLength(60)],
      ],
      rating: [
        5,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5),
        ],
      ],
    });
  }

  loadReviews(): void {
    this.loading = true;

    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar las valoraciones';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadDeletedReviews(): void {
    this.reviewService.getDeletedReviews().subscribe({
      next: (data) => {
        this.deletedReviews = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar las valoraciones eliminadas';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const dto: ReviewDto = {
      commentR: this.reviewForm.value.commentR,
      rating: Number(this.reviewForm.value.rating),
    };

    this.errorMessage = '';
    this.successMessage = '';

    if (this.editing && this.editingId !== null) {
      this.reviewService.updateReview(this.editingId, dto).subscribe({
        next: () => {
          this.cancelEdit();
          this.successMessage = 'Valoración actualizada correctamente';
          this.loadReviews();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error al actualizar la valoración';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.reviewService.createReview(dto).subscribe({
        next: () => {
          this.cancelEdit();
          this.successMessage = 'Valoración creada correctamente';
          this.loadReviews();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error al crear la valoración';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(review: Review): void {
    this.editing = true;
    this.editingId = review.idReview;

    this.reviewForm.patchValue({
      commentR: review.commentR,
      rating: review.rating,
    });

    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editing = false;
    this.editingId = null;

    this.reviewForm.reset({
      commentR: '',
      rating: 5,
    });
  }

  onDelete(idReview: number): void {
    if (!confirm('¿Eliminar esta valoración?')) return;

    this.reviewService.deleteReview(idReview).subscribe({
      next: () => {
        this.successMessage = 'Valoración eliminada correctamente';
        this.loadReviews();

        if (this.showDeleted) {
          this.loadDeletedReviews();
        }
      },
      error: () => {
        this.errorMessage = 'Error al eliminar la valoración';
        this.cdr.detectChanges();
      },
    });
  }

  onRestore(idReview: number): void {
    this.reviewService.restoreReview(idReview).subscribe({
      next: () => {
        this.successMessage = 'Valoración restaurada correctamente';
        this.loadReviews();
        this.loadDeletedReviews();
      },
      error: () => {
        this.errorMessage = 'Error al restaurar la valoración';
        this.cdr.detectChanges();
      },
    });
  }

  toggleDeleted(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedReviews();
    }
  }
}


