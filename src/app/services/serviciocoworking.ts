import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoworkingService {
  private baseUrl = 'https://mock.apidog.com/m1/1069422-1057565-default'; // ajusta base URL

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms`);
  }

  getRoomById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/rooms/${id}`);
  }

  // alias para compatibilidad con componentes que llaman getById
  getById(id: string | number): Observable<any> {
    return this.getRoomById(id);
  }

  reserveRoom(payload: { roomId: string | number; name: string; email: string; date: string; hours: number; notes?: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/roomreservation/`, payload);
  }
}
