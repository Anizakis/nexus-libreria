import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CoworkingService {
  // reemplaza por la URL real de tu API
  private apiUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/coworking';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(map(list => list || []));
  }

  getById(id: string | number): Observable<any | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}