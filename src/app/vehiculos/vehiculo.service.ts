import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VehiculoService {
  private urlEndPoint:string='http://localhost:8086/api2/vehiculos';

  constructor(private http: HttpClient) { }
  /*getVehiculos(): Observable <Vehiculo[]> {
    return of (VEHICULOS); // of convierte el objeto VEHICULOS en un observable
  }*/

  getVehiculos(): Observable<Vehiculo[]>{
     return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Vehiculo[])
     )
  }


}
