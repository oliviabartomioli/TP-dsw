import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request';
import { Request as RequestModel, requestDto } from '../../models/request.model';

@Component({
  selector: 'app-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class RequestComponent implements OnInit {
  private requestService = inject(RequestService);

  requests: RequestModel[] = [];

  newRequest: requestDto = {
    date: new Date(),
    state: 'pendiente',
    dniUs: 0,
  };

  editingId: number | null = null;

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (error) => {
        console.error('Error al obtener solicitudes:', error);
      },
    });
  }

  saveRequest(): void {
    if (this.editingId !== null) {
      this.requestService
        .updateRequest({
          ...this.newRequest,
          idRequest: this.editingId,
        })
        .subscribe({
          next: () => {
            this.loadRequests();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al actualizar solicitud:', error);
            alert(error.error?.message || 'No se pudo actualizar la solicitud');
          },
        });
    } else {
      this.requestService.createRequest(this.newRequest).subscribe({
        next: () => {
          this.loadRequests();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al crear solicitud:', error);
          alert(error.error?.message || 'No se pudo crear la solicitud');
        },
      });
    }
  }

  editRequest(request: RequestModel): void {
    this.editingId = request.idRequest;

    this.newRequest = {
      idRequest: request.idRequest,
      date: new Date(request.date),
      state: request.state,
      dniUs: request.user?.dniUs ?? 0,
    };
  }

  deleteRequest(idRequest: number): void {
    if (confirm('¿Seguro que querés eliminar esta solicitud?')) {
      this.requestService.deleteRequest(idRequest).subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (error) => {
          console.error('Error al eliminar solicitud:', error);
        },
      });
    }
  }

  resetForm(): void {
    this.newRequest = {
      date: new Date(),
      state: 'pendiente',
      dniUs: 0,
    };

    this.editingId = null;
  }
  onDateChange(value: string): void {
    this.newRequest.date = new Date(`${value}T12:00:00`);
  }
}