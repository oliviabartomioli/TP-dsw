
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Services } from '../../models/services.model';

@Component({
  selector: 'app-detalle-servicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-servicio.html',
  styleUrl: './detalle-servicio.css',
})
export class DetalleServicioComponent {
  @Input() service: Services | null = null;

  @Output() cerrar = new EventEmitter<void>();

  cerrarDetalle(): void {
    this.cerrar.emit();
  }
}

