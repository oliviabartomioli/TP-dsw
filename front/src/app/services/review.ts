

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Review, ReviewDto } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/review';

  
  createReview(review: ReviewDto): Observable<Review> {
    return this.http.post<Review>(
      `${this.apiUrl}/createReview`,
      review
    );
  }

  
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  
  getReviewById(idReview: number): Observable<Review> {
    return this.http.get<Review>(
      `${this.apiUrl}/${idReview}`
    );
  }

  
  updateReview(
    idReview: number,
    review: ReviewDto
  ): Observable<Review> {
    return this.http.put<Review>(
      `${this.apiUrl}/${idReview}`,
      review
    );
  }

  
  deleteReview(idReview: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idReview}`
    );
  }


  getDeletedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }


  restoreReview(idReview: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${idReview}`,
      {}
    );
  }
}
