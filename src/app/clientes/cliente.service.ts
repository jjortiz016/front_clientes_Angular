import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import {map, catchError} from 'rxjs/operators'; //segunda forma
import { of, Observable, throwError} from 'rxjs';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8086/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

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

  getCliente(id): Observable<Cliente>{
     return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']); //para que enrute o redirija al listado de cliente
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje , 'error' );
          //return throwError(e);  //marca deprecated
           return throwError(() => new Error(e))  //retornamos el el objeto del error e tipo observable
        })
     );
  }


  update(cliente: Cliente):Observable<Cliente>{
     return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}
