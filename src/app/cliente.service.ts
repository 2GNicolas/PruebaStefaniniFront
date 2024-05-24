import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Cliente {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private apiUrl = 'http://localhost:8090/api/info';

  constructor(private http: HttpClient) { }

  getCliente(tipoDocumento: string, numeroDocumento: string): Observable<Cliente> {
    //peticion a la API
    const params = new HttpParams().set('tipoDocumento', tipoDocumento).set('numeroDocumento', numeroDocumento);
    return this.http.get<Cliente>(this.apiUrl, { params }); }
}
