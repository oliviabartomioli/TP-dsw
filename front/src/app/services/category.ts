import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, categoryDto } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/category';

  createCategory(category: categoryDto): Observable<Category> {
    return this.http.post<Category>(
      `${this.apiUrl}/createCategory`,
      category
    );
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryDelete(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  upDateCategory(category: categoryDto): Observable<Category> {
    return this.http.put<Category>(
      this.apiUrl,
      category
    );
  }

  deleteCategory(idCategory: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${idCategory}`
    );
  }

  restoreCategory(idCategory: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${idCategory}`,
      {}
    );
  }
}