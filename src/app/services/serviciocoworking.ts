import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoworkingService {
  private baseUrl = 'https://mock.apidog.com/m1/1069422-1057565-default';

  // Datos estáticos correctos ya que la api devuelve la misma foto en rooms {id}
  private roomsData = [
    { id: 1, name: "Sala Andalucía", capacity: "9+", planta: 1, precio: 150.5, image: "https://img1.wsimg.com/isteam/ip/0541a3a5-e437-4be0-ab80-374d2f7c7e88/IMG_20220620_144712_00%20-%20copia.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280" },
    { id: 2, name: "Sala Barcelona", capacity: "5-8", planta: 1, precio: 120, image: "https://image.workin.space/wipng-aygjcpdcasn1xotia41m1nksm/regus-ramonville-coworking-toulouse-0008_standard.png?crop=67%2C0%2C1061%2C796&width=1280" },
    { id: 3, name: "Sala Madrid", capacity: "9+", planta: 2, precio: 180.75, image: "https://assets.iwgplc.com/image/upload/c_fill,f_auto,q_auto,w_327,h_245/CentreImagery/5466/5466_6.jpg" },
    { id: 4, name: "Sala Valencia", capacity: "2-4", planta: 1, precio: 85.25, image: "https://assets.iwgplc.com/image/upload/c_fill,f_auto,q_auto,w_327,h_245/CentreImagery/4868/4868_5.jpg" },
    { id: 5, name: "Sala Sevilla", capacity: "5-8", planta: 2, precio: 130, image: "https://assets.iwgplc.com/image/upload/c_fill,f_auto,q_auto,w_327,h_245/CentreImagery/5149/5149_3.jpg" },
    { id: 6, name: "Sala Bilbao", capacity: "1", planta: 1, precio: 45, image: "https://aticco.com/wp-content/uploads/2024/07/que-es-coworking-1.jpg" },
    { id: 7, name: "Sala Zaragoza", capacity: "2-4", planta: 3, precio: 95.5, image: "https://img1.wsimg.com/isteam/ip/0541a3a5-e437-4be0-ab80-374d2f7c7e88/IMG_20220620_144712_00%20-%20copia.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1280" },
    { id: 8, name: "Sala Málaga", capacity: "5-8", planta: 2, precio: 125.75, image: "https://ovacen.com/wp-content/uploads/2017/02/coworking-espacio-de-trabajo.jpg" },
    { id: 9, name: "Sala Murcia", capacity: "1", planta: 3, precio: 50, image: "https://static-cse.canva.com/blob/1172708/EspaciosCoWorking.cb543412.avif" },
    { id: 10, name: "Sala Las Palmas", capacity: "9+", planta: 3, precio: 200, image: "https://pecsa.es/wp-content/uploads/2021/12/Crecimiento-en-la-demanda-de-espacios-coworking.jpg" }
  ];

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rooms`);
  }

  getById(id: string | number): Observable<any> {
    const room = this.roomsData.find(r => r.id === Number(id));
    return of(room || {});
  }

  reserveRoom(payload: { roomId: string | number; name: string; email: string; date: string; hours: number; notes?: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/roomreservation/`, payload);
  }
}
