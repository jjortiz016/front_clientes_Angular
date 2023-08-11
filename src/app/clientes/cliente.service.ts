import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import {map} from 'rxjs/operators'; //segunda forma
@Injectable()
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8086/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
 // return of(CLIENTES);
     //return this.http.get<Cliente[]>(this.urlEndPoint); //esta es una forma
     return this.http.get(this.urlEndPoint).pipe(
        map( (response) => response as Cliente[])
      )  //segunda forma
      
  }

  create(cliente: Cliente): Observable<Cliente>{
      return this.http.post<Cliente>(this.urlEndPoint,cliente, {headers: this.httpHeaders})

  }
}
