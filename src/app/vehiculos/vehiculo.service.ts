import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable()
export class VehiculoService {
  private urlEndPoint:string='http://localhost:8086/api/vehiculos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  /*getVehiculos(): Observable <Vehiculo[]> {
    return of (VEHICULOS); // of convierte el objeto VEHICULOS en un observable
  }*/

 /* getVehiculos(): Observable<Vehiculo[]>{
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
  }*/

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer' + token)
    }
    return this.httpHeaders;
  }

private isNoAuthorized(e):boolean{

  if(e.status==401){
   
       Swal.fire('Error ', `Hola  necesita autenticar para acceder a este recurso ${e.status}`, 'error');
       //cierr la sesión si el token esta expirado en el backend
       if(this.authService.isAuthenticated()){
          this.authService.logout();
       }
       this.router.navigate(['/login'])
    return true;
  }

  if(e.status==403){
    Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso solicita permiso para acceder a este recurso.` , 'warning' );
    this.router.navigate(['/vehiculos'])
    return true;
  }
  return false;
}  
  //creando el metodo getVhiculos con paginación
  getVehiculos(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+ page).pipe(
     map((response: any) => {
        (response.content as Vehiculo[]).map(vehiculo =>{
           vehiculo.placa = vehiculo.placa.toUpperCase();
           return vehiculo;
        });
        return response;
     })
    )
   }

  create(vehiculo: Vehiculo): Observable <any>{
    return this.http.post<any>(this.urlEndPoint, vehiculo, {headers: this.httpHeaders}).pipe(
      catchError(e=> {

         if (this.isNoAuthorized(e)){
          return throwError(()=> e);

         }
        if(e.status==400){
          return throwError(()=> e);
        }

        //console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
       // return throwError(() => new Error(e));
        return throwError(()=> e);

      })
    );
    
  }

   getVehiculo(id): Observable<Vehiculo>{
      return this.http.get<Vehiculo>(`${this.urlEndPoint}/${id}`, {headers:this.agregarAuthorizationHeader()})
      .pipe(
        catchError(e => {
          if (this.isNoAuthorized(e)){
            return throwError(()=> e); //se devuelve de esta forma por que el error ya biene desde backend configurado previamente
           }

          this.router.navigate(['/vehiculos']);
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          // return throwError(()=> new Error(e)) //retornamos el objeto con 2 propiedades. El nombre del error (generalmente “Error”) y message: Una descripción del error.
          return throwError(()=> e);
        })
      );
   }

   getVerVehiculo(id): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(`${this.urlEndPoint}/ver/${id}`, {headers:this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.isNoAuthorized(e)){
          return throwError(()=> e); //se devuelve de esta forma por que el error ya biene desde backend configurado previamente
         }

        this.router.navigate(['/vehiculos']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        // return throwError(()=> new Error(e)) //retornamos el objeto con 2 propiedades. El nombre del error (generalmente “Error”) y message: Una descripción del error.
        return throwError(()=> e);
      })
    );
 }


   update(vehiculo:Vehiculo):Observable<Vehiculo>{
     return this.http.put(`${this.urlEndPoint}/${vehiculo.id}`, vehiculo, {headers:this.agregarAuthorizationHeader()}).pipe(
       map((response:any) => response.vehiculo as Vehiculo),
        catchError(e => {
          if (this.isNoAuthorized(e)){
            return throwError(()=> e); //se devuelve de esta forma por que el error ya biene desde backend configurado previamente
           }

          if(e.status==400){
            return throwError(()=> e);
          }
            //  console.error(e.error.mensaje)
            // Swal.fire('Error al actualizar el vehiculo', e.error.mensaje, 'error');
            Swal.fire(e.error.mensaje, e.error.error, 'error');
             // return throwError(()=> new Error(e)) //retornamos el objeto del error.
             return throwError(()=> e);
            })
     );
   }

   delete(id:number): Observable<Vehiculo>{
      return this.http.delete<Vehiculo>(`${this.urlEndPoint}/${id}`, {headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          if (this.isNoAuthorized(e)){
            return throwError(()=> e); //se devuelve de esta forma por que el error ya biene desde backend configurado previamente
           }

          Swal.fire(e.error.mensaje, e.error.error, 'error');
           return throwError(()=> e);
         // return throwError(() => new Error(e))

        })

      );

   }

}
