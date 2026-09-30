import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UsersDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/users';

  createUser(user: UsersDto): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/createUser`,
      user
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserDelete(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/delete/deleted`
    );
  }

  getUserByDni(dniUs: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${dniUs}`
    );
  }

  upDateUser(user: UsersDto): Observable<User> {
    return this.http.put<User>(
      this.apiUrl,
      user
    );
  }

  deleteUser(dniUs: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/${dniUs}`
    );
  }

  restoreUser(dniUs: number): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.apiUrl}/restore/${dniUs}`,
      {}
    );
  }
}