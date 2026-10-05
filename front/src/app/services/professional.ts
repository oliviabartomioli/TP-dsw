import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professional, professionalDto } from '../models/professional.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProfessionalService{
    private readonly apiUrl='http://localhost:3000/api/v1/professional';
    constructor(private http:HttpClient){
        
    }
    createProfessional(professional: professionalDto): Observable<Professional>{
        return this.http.post<Professional>(`${this.apiUrl}/createProfessional`, professional)

    }
    getProfessionalByDniP(dniP:number): Observable<Professional>{
        return this.http.get<Professional>(`${this.apiUrl}/${dniP}`);
    }
    getProfessional():Observable<Professional[]>{
        return this.http.get<Professional[]>(this.apiUrl)
    }
    getProfessionalDelete():Observable<Professional[]>{
        return this.http.get<Professional[]>(`${this.apiUrl}/delete/deleted`)
    }
    upDateProfessional(professional:professionalDto):Observable<Professional>{
        return this.http.put<Professional>(this.apiUrl, professional)
    }
}
