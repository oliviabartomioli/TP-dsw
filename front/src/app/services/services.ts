import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Services, servicesDto } from '../models/services.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/services';

  constructor(private http: HttpClient) {}

  createServices(service: servicesDto): Observable<Services> {
    return this.http.post<Services>(
      `${this.apiUrl}/createServices`,
      service
    );
  }

  getServicesById(idService: number): Observable<Services> {
    return this.http.get<Services>(
      `${this.apiUrl}/${idService}`
    );
  }

  getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(this.apiUrl);
  }

  getServicesDelete(): Observable<Services[]> {
    return this.http.get<Services[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  upDateServices(service: servicesDto): Observable<Services> {
    return this.http.put<Services>(
      this.apiUrl,
      service
    );
  }

  deleteServices(idService: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${idService}`
    );
  }

  restoreServices(idService: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${idService}`,
      {}
    );
  }
}