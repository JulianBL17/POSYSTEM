import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Venta {
  id?: number;
  total: number;
  metodoPago: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Ventas {

  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  obtenerVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  crearVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(
      this.apiUrl,
      venta
    );
  }
}