import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',

})
export class FormVehiculoComponent implements OnInit {
  vehiculo: Vehiculo = new Vehiculo();
  tituloVehiculo:string = 'Crear Vehiculo';

  constructor(private vehiculoService: VehiculoService, private router: Router ){}

  ngOnInit(): void {
   
  }

  public create():void{
    this.vehiculoService.create(this.vehiculo)
    .subscribe(vehiculo=>{
        this.router.navigate(['/vehiculos']) //retorna al listado de clientes
        Swal.fire('Nuevo cliente', `Vehiculo ${vehiculo.placa} creado con exito!`, 'success')
    }
    )
  }
}
