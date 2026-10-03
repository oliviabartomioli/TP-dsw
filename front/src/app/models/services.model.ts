import { Category } from './category.model';

export interface Services {
  idService: number;
  nameS: string;
  descriptionS: string;
  deleteS?: boolean;
  category?: Category;
}

export interface servicesDto {
  idService: number;
  nameS: string;
  descriptionS: string;
  idCategory: number;
  deleteS?: boolean;
}