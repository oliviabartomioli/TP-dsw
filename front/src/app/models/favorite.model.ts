
export interface Favorite {
  idfav: number;
  date: string;
  deleteFav?: boolean;

  user: {
    dniUs: number;
    nameU: string;
    surnameU: string;
  };

  professional: {
    dniP: number;
    nameP: string;
    surnameP: string;
  };
}

export interface FavoriteDto {
  date: string;
  dniUs: number;
  dniP: number;
  deleteFav?: boolean;
}

