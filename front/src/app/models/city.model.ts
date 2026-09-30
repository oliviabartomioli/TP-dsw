import { Province } from './province.model';

export interface City {
  idCity: number;
  nameCity: string;
  deleteCity?: boolean;
  province?: Province;
}

export interface cityDto {
  idCity: number;
  nameCity: string;
  idProvince: number;
  deleteCity?: boolean;
}