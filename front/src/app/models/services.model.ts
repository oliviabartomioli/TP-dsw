import { Category } from './category.model';
import { Professional } from './professional.model';

export interface Services {
  idService: number;
  nameS: string;
  descriptionS: string;
  deleteS?: boolean;
  category?: Category;
  professional?: Professional;
}

export interface servicesDto {
  idService: number;
  nameS: string;
  descriptionS: string;
  idCategory: number;
  dniP: number;
  deleteS?: boolean;
}