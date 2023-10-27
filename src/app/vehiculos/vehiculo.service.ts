import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';
import { Observable, of } from 'rxjs';

@Injectable()
export class VehiculoService {

  constructor() { }
  getVehiculos(): Observable <Vehiculo[]> {
    return of (VEHICULOS); // of convierte el objeto VEHICULOS en un observable
  }
}
