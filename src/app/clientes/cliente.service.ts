import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient,  HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http'; 
import {map, catchError, tap} from 'rxjs/operators'; //segunda forma
import { of, Observable, throwError} from 'rxjs';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable()
export class ClienteService {
  private urlEndPoint:string= 'http://localhost:8086/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }



getRegiones(): Observable<Region[]>{
  return this.http.get<Region[]>(this.urlEndPoint+'/regiones');
}

/*
  getClientes(): Observable<Cliente[]> {
 // return of(CLIENTES);
     //return this.http.get<Cliente[]>(this.urlEndPoint); //esta es una forma
     return this.http.get(this.urlEndPoint).pipe(
        map( (response) => response as Cliente[])
      )  //segunda forma
      
  }*/
 
   getClientes(page: number): Observable<any> {
    // return of(CLIENTES);
        //return this.http.get<Cliente[]>(this.urlEndPoint); //esta es una forma
        return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
          tap( (response: any) => {
            console.log('cliente.service tap1');
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          }),

           map( (response:any) => {
          
            (response.content as Cliente[]).map(cliente => {
               cliente.nombre = cliente.nombre.toUpperCase();
               return cliente;
            });
            return response;
           }
           ),

           tap(response => {
            console.log('cliente.service tap2');
            //let clientes= response as Cliente[];
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          })
         );
     }

  create(cliente: Cliente): Observable<any>{
      return this.http.post<any>(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
          catchError(e => {
            if(e.status==400){
              //return throwError(e);
              return throwError(()=> e);
            }
          //  console.error(e.error.mensaje);
           // Swal.fire('Error al crear', e.error.mensaje , 'error' );
            Swal.fire(e.error.mensaje, e.error.error, 'error' );
            return throwError(() => new Error(e))

          })
      );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
       catchError(e => {
         this.router.navigate(['/clientes']); //para que enrute o redirija al listado de cliente
         console.error(e.error.mensaje);
         Swal.fire('Error al editar', e.error.mensaje , 'error' );
         //return throwError(e);  //marca deprecated
          return throwError(() => e)  //retornamos el el objeto del error e tipo observable
       })
    );
 }


  update(cliente: Cliente):Observable<Cliente>{
     return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      map((response:any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status==400){
          return throwError(() => e);
        }
      //  console.error(e.error.mensaje);
        //Swal.fire('Error guardar el registro.', e.error.mensaje , 'error' );
        Swal.fire(e.error.mensaje, e.error.error, 'error' );
        return throwError(() => e)

      })
     );
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        //Swal.fire('Error al eliminar', e.error.mensaje , 'error' );
        Swal.fire(e.error.mensaje, e.error.error, 'error' );
        return throwError(() => new Error(e))

      })
    );
  }


  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
     let formData = new FormData();
     formData.append("archivo", archivo);
     formData.append("id",id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true
    });

     return this.http.request(req);
  }
}
