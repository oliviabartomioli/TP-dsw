import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvailabilityService } from '../../services/availability';
import { Availability as AvailabilityModel, availabilityDto } from '../../models/availability.model';
import { ProfessionalService } from '../../services/professional';
import { Professional } from '../../models/professional.model';

@Component({
  selector: 'app-availability',
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.html',
  styleUrl: './availability.css',
})
export class AvailabilityComponent implements OnInit {
  private availabilityService = inject(AvailabilityService);
  private professionalService = inject(ProfessionalService);

  availabilities: AvailabilityModel[] = [];
  professionals: Professional[] = [];

  newAvailability: availabilityDto = {
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    dniProfessional: 0,
  };

  editingId: number | null = null;

 ngOnInit(): void {
    this.loadAvailabilities();
    this.loadProfessionals();
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

  loadProfessionals(): void {
    this.professionalService.getProfessional().subscribe({
      next: (data) => {
        this.professionals = data;
      },
      error: (error) => {
        console.error('Error al obtener profesionales:', error);
        alert('No se pudieron cargar los profesionales.');
      },
    });
  }

  saveAvailability(): void {
    if (
      !this.newAvailability.dayOfWeek ||
      !this.newAvailability.startTime ||
      !this.newAvailability.endTime ||
      !this.newAvailability.dniProfessional ||
      this.newAvailability.dniProfessional <= 0
    ) {
      alert('Por favor, completá todos los campos correctamente.');
      return;
    }

    if (this.newAvailability.startTime >= this.newAvailability.endTime) {
      alert('La hora de inicio debe ser menor que la hora de finalización.');
      return;
    }

    if (this.editingId !== null) {

      this.availabilityService
        .updateAvailability(this.editingId, this.newAvailability)
        .subscribe({
          next: () => {
            this.loadAvailabilities();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            alert('No se pudo actualizar la disponibilidad. Verificá los datos ingresados.');
          },
        });

    } else {

      this.availabilityService
        .createAvailability(this.newAvailability)
        .subscribe({
          next: () => {
            this.loadAvailabilities();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al crear:', error);
            alert('No se pudo crear la disponibilidad. Verificá los datos ingresados.');
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