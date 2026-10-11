
export interface Request {
  idRequest: number;
  date: string;
  state: string;
  deleteRequest?: boolean;

  user: {
    dniUs: number;
    nameU: string;
    surnameU: string;
  };

  service?: {
    idService: number;
    nameS: string;
    professional?: {
      dniP: number;
      nameP: string;
      surnameP: string;
    };
  };
}

export interface RequestDto {
  date: string;
  dniUs: number;
  idService: number;
}

export interface UpdateRequestDto extends RequestDto {
  idRequest: number;
}
