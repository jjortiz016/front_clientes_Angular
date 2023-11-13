import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class VehiculoService {
  private urlEndPoint:string='http://localhost:8086/api2/vehiculos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }
  /*getVehiculos(): Observable <Vehiculo[]> {
    return of (VEHICULOS); // of convierte el objeto VEHICULOS en un observable
  }*/

  getVehiculos(): Observable<Vehiculo[]>{
     return this.http.get(this.urlEndPoint).pipe(
      map((response) => {
        //modificando para el codigo para cambiar el contenido del flujo, en este caso pasaremos a mayuscula la placa como ejemplo
        let vehiculos= response as Vehiculo[];

        return vehiculos.map(vehiculo=>{
          vehiculo.placa = vehiculo.placa.toUpperCase();
          return vehiculo;
        });
      })
     )
  }

  create(vehiculo: Vehiculo): Observable <any>{
    return this.http.post<any>(this.urlEndPoint, vehiculo, {headers: this.httpHeaders}).pipe(
      catchError(e=> {
        if(e.status==400){
          return throwError(()=> e);
        }

        //console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new Error(e));

      })
    );
    
  }

   getVehiculo(id): Observable<Vehiculo>{
      return this.http.get<Vehiculo>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(['/vehiculos']);
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
           return throwError(()=> new Error(e)) //retornamos el objeto del error.
          
        })
      );
   }

   update(vehiculo:Vehiculo):Observable<Vehiculo>{
     return this.http.put(`${this.urlEndPoint}/${vehiculo.id}`, vehiculo, {headers: this.httpHeaders}).pipe(
       map((response:any) => response.vehiculo as Vehiculo),
        catchError(e => {
          if(e.status==400){
            return throwError(()=> e);
          }
            //  console.error(e.error.mensaje)
            // Swal.fire('Error al actualizar el vehiculo', e.error.mensaje, 'error');
            Swal.fire(e.error.mensaje, e.error.error, 'error');
              return throwError(()=> new Error(e)) //retornamos el objeto del error.
            })
     );
   }

   delete(id:number): Observable<Vehiculo>{
      return this.http.delete<Vehiculo>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
         
          return throwError(() => new Error(e))

        })

      );

   }

}
