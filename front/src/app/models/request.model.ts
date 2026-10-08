import { User } from './user.model';

export interface Request {
  idRequest: number;
  date: Date;
  state: string;
  deleteRequest?: boolean;
  user?: User;
}

export interface requestDto {
  idRequest?: number;
  date: Date;
  state: string;
  dniUs: number;
  deleteRequest?: boolean;
}