import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvailabilityService } from '../../services/availability';
import { Availability as AvailabilityModel, availabilityDto } from '../../models/availability.model';

@Component({
  selector: 'app-availability',
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.html',
  styleUrl: './availability.css',
})
export class AvailabilityComponent implements OnInit {
  private availabilityService = inject(AvailabilityService);

  availabilities: AvailabilityModel[] = [];

  newAvailability: availabilityDto = {
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    dniProfessional: 0,
  };

  editingId: number | null = null;

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  loadAvailabilities(): void {
    this.availabilityService.getAvailability().subscribe({
      next: (data) => {
        this.availabilities = data;
      },
      error: (error) => {
        console.error('Error al obtener disponibilidades:', error);
      },
    });
  }

  saveAvailability(): void {
    console.log('Datos enviados:', this.newAvailability);
    console.log('ID en edición:', this.editingId);
      if (this.editingId !== null) {
    console.log('Actualizando disponibilidad:', this.newAvailability);

    this.availabilityService
      .updateAvailability(this.editingId, this.newAvailability)
      .subscribe({
        next: (response) => {
          console.log('Disponibilidad actualizada:', response);
          this.loadAvailabilities();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert(
            error.error?.message || 'No se pudo actualizar la disponibilidad'
          );
        },
      });
  }
}

  editAvailability(availability: AvailabilityModel): void {
  this.editingId = availability.idAvailability;

  this.newAvailability = {
    dayOfWeek: availability.dayOfWeek,
    startTime: availability.startTime.slice(0, 5),
    endTime: availability.endTime.slice(0, 5),
    dniProfessional: availability.professional?.dniP ?? 0,
  };
}

  deleteAvailability(idAvailability: number): void {
    if (confirm('¿Seguro que querés eliminar esta disponibilidad?')) {
      this.availabilityService.deleteAvailability(idAvailability).subscribe({
        next: () => {
          this.loadAvailabilities();
        },
        error: (error) => {
          console.error('Error al eliminar disponibilidad:', error);
        },
      });
    }
  }

  resetForm(): void {
    this.newAvailability = {
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      dniProfessional: 0,
    };

    this.editingId = null;
  }
}