import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability, availabilityDto } from '../models/availability.model';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/availability';

  createAvailability(availability: availabilityDto): Observable<Availability> {
    return this.http.post<Availability>(
      `${this.apiUrl}/createAvailability`,
      availability
    );
  }

  getAvailability(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.apiUrl);
  }

  getAvailabilityById(idAvailability: number): Observable<Availability> {
    return this.http.get<Availability>(
      `${this.apiUrl}/${idAvailability}`
    );
  }

  updateAvailability(
    idAvailability: number,
    availability: availabilityDto
  ): Observable<Availability> {
    return this.http.put<Availability>(
      `${this.apiUrl}/${idAvailability}`,
      availability
    );
  }

  deleteAvailability(idAvailability: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${idAvailability}`
    );
  }
}