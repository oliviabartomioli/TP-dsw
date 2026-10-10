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

import {
  Request,
  RequestDto,
  UpdateRequestDto,
} from '../../models/request.model';

import { RequestService } from '../../services/request';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class RequestComponent implements OnInit {
  requests: Request[] = [];
  deletedRequests: Request[] = [];

  requestForm!: FormGroup;

  editing = false;
  editingId: number | null = null;
  showDeleted = false;
  loading = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRequests();
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      date: ['', Validators.required],
      dniUs: [null, [Validators.required, Validators.min(1)]],
      idService: [null, [Validators.required, Validators.min(1)]],
    });
  }

  loadRequests(): void {
    this.loading = true;

    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Error al cargar las solicitudes';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadDeletedRequests(): void {
    this.requestService.getDeletedRequests().subscribe({
      next: (data) => {
        this.deletedRequests = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage =
          'Error al cargar las solicitudes eliminadas';
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const formValue = this.requestForm.value;

    const dto: RequestDto = {
      date: new Date(formValue.date).toISOString(),
      dniUs: Number(formValue.dniUs),
      idService: Number(formValue.idService),
    };

    this.errorMessage = '';
    this.successMessage = '';

    if (this.editing && this.editingId !== null) {
      const updateDto: UpdateRequestDto = {
        ...dto,
        idRequest: this.editingId,
      };

      this.requestService.updateRequest(updateDto).subscribe({
        next: () => {
          this.cancelEdit();
          this.successMessage =
            'Solicitud actualizada correctamente';
          this.loadRequests();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error al actualizar la solicitud';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.requestService.createRequest(dto).subscribe({
        next: () => {
          this.cancelEdit();
          this.successMessage = 'Solicitud creada correctamente';
          this.loadRequests();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Error al crear la solicitud';
          this.cdr.detectChanges();
        },
      });
    }
  }

  onEdit(request: Request): void {
    this.editing = true;
    this.editingId = request.idRequest;

    this.requestForm.patchValue({
      date: request.date
        ? request.date.substring(0, 10)
        : '',
      dniUs: request.user?.dniUs,
      idService: request.service?.idService,
    });

    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editing = false;
    this.editingId = null;

    this.requestForm.reset({
      date: '',
      dniUs: null,
      idService: null,
    });
  }

  onDelete(idRequest: number): void {
    if (!confirm('¿Eliminar esta solicitud?')) {
      return;
    }

    this.requestService.deleteRequest(idRequest).subscribe({
      next: () => {
        this.successMessage =
          'Solicitud eliminada correctamente';
        this.errorMessage = '';
        this.loadRequests();

        if (this.showDeleted) {
          this.loadDeletedRequests();
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Error al eliminar la solicitud';
        this.cdr.detectChanges();
      },
    });
  }

  onRestore(idRequest: number): void {
    this.requestService.restoreRequest(idRequest).subscribe({
      next: () => {
        this.successMessage =
          'Solicitud restaurada correctamente';
        this.errorMessage = '';
        this.loadRequests();
        this.loadDeletedRequests();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Error al restaurar la solicitud';
        this.cdr.detectChanges();
      },
    });
  }
  
changeState(idRequest: number, state: string): void {
  this.errorMessage = '';
  this.successMessage = '';

  this.requestService.changeRequestState(idRequest, state).subscribe({
    next: () => {
      this.successMessage =
        'Estado de la solicitud actualizado a: ' + state;

      this.loadRequests();
      this.cdr.detectChanges();
    },
    error: (err) => {
      this.errorMessage =
        err.error?.message ||
        'Error al cambiar el estado de la solicitud';

      this.cdr.detectChanges();
    },
  });
}


  toggleDeleted(): void {
    this.showDeleted = !this.showDeleted;

    if (this.showDeleted) {
      this.loadDeletedRequests();
    }
  }
}
