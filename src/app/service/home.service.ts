import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interface/character-interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://api.arasaac.org/v1';

  getCharacter(country: string, searchText: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/pictograms/${country}/search/${searchText}`);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pictograms/${id}?download=false`, { responseType: 'blob' });
  }
}
