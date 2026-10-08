export interface Favorite {
  date: string;
  deleteFav?: boolean;
  dniP: number;
  dniU: number;
}
export interface FavoriteDto {
  date: string;
  dniUs: number;
  dniP: number;
  deleteFav?: boolean;
}