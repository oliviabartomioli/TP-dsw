import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { FavoriteComponent } from "../components/favorite/favorite";
import { Favorite, FavoriteDto } from "../models/favorite.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class favoriteServices{
    private http= inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/v1/favorite';

    createFavorite(favorite: FavoriteDto): Observable <Favorite> {
        return this.http.post<Favorite>(`${this.apiUrl}/createFavorite`, favorite);


    }

    getFavorite(): Observable <Favorite[]> {
        return this.http.get<Favorite[]> (this.apiUrl);
    } 

    getFavoriteDelete(): Observable <Favorite[]> {
        return this.http.get<Favorite[]> (`${this.apiUrl}/delete/deleted`);
    }

    getFavoriteById(idfav:number): Observable<Favorite> {
        return this.http.get<Favorite> (`${this.apiUrl}/${idfav}`);
    }

    deleteFavorite(idfav: number): Observable<boolean> {
        return this.http.delete<boolean> (`${this.apiUrl}/${idfav}`);
    }

    restoreFavorite(idfav: number): Observable<boolean> {
        return this.http.patch<boolean> (`${this.apiUrl}/restore/${idfav}`,{});
    }
}

