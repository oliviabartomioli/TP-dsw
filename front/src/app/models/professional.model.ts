import { City } from './city.model';

export interface Professional {
  dniP: number;
  nameP: string;
  surnameP: string;
  typeP: string;
  assessmentP: string;
  deleteP?: boolean;
  city?: City;
}

export interface professionalDto {
  dniP: number;
  nameP: string;
  surnameP: string;
  typeP: string;
  assessmentP: string;
  idCity: number;
  deleteP?: boolean;
}