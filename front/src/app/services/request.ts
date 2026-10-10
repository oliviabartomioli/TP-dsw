import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Request,
  RequestDto,
  UpdateRequestDto,
} from '../models/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/request';

  
  createRequest(request: RequestDto): Observable<Request> {
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

  
  updateRequest(request: UpdateRequestDto): Observable<Request> {
    return this.http.put<Request>(this.apiUrl, request);
  }

  
  deleteRequest(idRequest: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${idRequest}`
    );
  }

  
  getDeletedRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  
  restoreRequest(idRequest: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${idRequest}`,
      {}
    );
  }

  
  
  changeRequestState(
    idRequest: number,
    state: string
  ): Observable<Request> {
    return this.http.patch<Request>(
      `${this.apiUrl}/${idRequest}/state`,
      { state }
    );
  }

}
