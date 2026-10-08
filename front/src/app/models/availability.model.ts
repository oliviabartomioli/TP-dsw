import { Professional } from './professional.model';

export interface Availability {
  idAvailability: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  deleteAv?: boolean;
  professional?: Professional;
}

export interface availabilityDto {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  dniProfessional: number;
  deleteAv?: boolean;
}