export interface Category {
  idCategory: number;
  nameC: string;
  descriptionC: string;
  deleteC?: boolean;
}

export interface categoryDto {
  idCategory?: number;
  nameC: string;
  descriptionC: string;
  deleteC?: boolean;
}