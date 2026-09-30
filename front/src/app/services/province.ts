import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province, provinceDto } from '../models/province.model';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/province';

  createProvince(province: provinceDto): Observable<Province> {
    return this.http.post<Province>(
      `${this.apiUrl}/createProvince`,
      province
    );
  }

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiUrl);
  }

  getProvincesDeleted(): Observable<Province[]> {
    return this.http.get<Province[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  updateProvince(province: provinceDto): Observable<Province> {
    return this.http.put<Province>(this.apiUrl, province);
  }

  deleteProvince(nameProvince: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${nameProvince}`
    );
  }

  restoreProvince(nameProvince: string): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${nameProvince}`,
      {}
    );
  }
}