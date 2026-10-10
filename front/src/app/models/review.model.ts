
export interface Review {
  idReview: number;
  commentR: string;
  rating: number;
  deleteR?: boolean;
}

export interface ReviewDto {
  commentR: string;
  rating: number;
  deleteR?: boolean;
}

