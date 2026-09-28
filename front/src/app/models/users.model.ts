export interface User {
  dniUs: number;
  nameU: string;
  surnameU: string;
  phoneU: string;
  emailU: string;
  passwordU: string;
  deleteU?: boolean;
}
export interface UsersDto {
  dniUs: number;
  nameU: string;
  surnameU: string;
  phoneU: string;
  emailU: string;
  passwordU: string;
  deleteU?: boolean;
}