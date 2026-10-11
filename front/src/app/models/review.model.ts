import { Request } from './request.model';
export interface Review {
  idReview: number;
  commentR: string;
  rating: number;
  deleteR?: boolean;
  request?: Request;
}

export interface ReviewDto {
  commentR: string;
  rating: number;
  idRequest: number;
  deleteR?: boolean;
}
