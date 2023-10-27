import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
  
})
export class VehiculosComponent implements OnInit {
 
   vehiculos: Vehiculo[];

    constructor(private vehiculoService: VehiculoService){}
 
      ngOnInit() {
        this.vehiculos= this.vehiculoService.getVehiculos();
        //this.vehiculos=VEHICULOS;
      }

}
