import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class VehiculoService {
  private urlEndPoint:string='http://localhost:8086/api2/vehiculos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }
  /*getVehiculos(): Observable <Vehiculo[]> {
    return of (VEHICULOS); // of convierte el objeto VEHICULOS en un observable
  }*/

  getVehiculos(): Observable<Vehiculo[]>{
     return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Vehiculo[])
     )
  }

  create(vehiculo: Vehiculo): Observable <Vehiculo>{
    return this.http.post<Vehiculo>(this.urlEndPoint, vehiculo, {headers: this.httpHeaders})
    
  }

   getVehiculo(id): Observable<Vehiculo>{
      return this.http.get<Vehiculo>(`${this.urlEndPoint}/${id}`)
   }

   update(vehiculo:Vehiculo):Observable<Vehiculo>{
     return this.http.put<Vehiculo>(`${this.urlEndPoint}/${vehiculo.id}`, vehiculo, {headers: this.httpHeaders})
   }

}
