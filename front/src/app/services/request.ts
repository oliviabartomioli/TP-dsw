import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request, requestDto } from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/request';

  createRequest(request: requestDto): Observable<Request> {
    return this.http.post<Request>(
      `${this.apiUrl}/createRequest`,
      request
    );
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getRequestById(idRequest: number): Observable<Request> {
    return this.http.get<Request>(
      `${this.apiUrl}/${idRequest}`
    );
  }

  getRequestsDeleted(): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  updateRequest(request: requestDto): Observable<Request> {
    return this.http.put<Request>(
      this.apiUrl,
      request
    );
  }

  deleteRequest(idRequest: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${idRequest}`
    );
  }

  restoreRequest(idRequest: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${idRequest}`,
      {}
    );
  }
}