import { Injectable } from '@angular/core';
import { VEHICULOS } from './vehiculos.json';
import { Vehiculo } from './vehiculo';

@Injectable()
export class VehiculoService {

  constructor() { }
  getVehiculos(): Vehiculo[] {
    return VEHICULOS;
  }
}
