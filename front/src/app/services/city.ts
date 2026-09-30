import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, cityDto } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/city';

  createCity(city: cityDto): Observable<City> {
    return this.http.post<City>(
      `${this.apiUrl}/createCity`,
      city
    );
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  getCitiesDeleted(): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  updateCity(city: cityDto): Observable<City> {
    return this.http.put<City>(this.apiUrl, city);
  }

  deleteCity(nameCity: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${nameCity}`
    );
  }

  restoreCity(nameCity: string): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${nameCity}`,
      {}
    );
  }
}