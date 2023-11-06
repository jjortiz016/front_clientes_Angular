import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',

})
export class FormVehiculoComponent implements OnInit {
  vehiculo: Vehiculo = new Vehiculo();
  tituloVehiculo:string = 'Crear Vehiculo';
  errores:string[];
  

  constructor(private vehiculoService: VehiculoService, private router: Router, private activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.cargarVehiculo();
  }

 cargarVehiculo(): void{
  this.activateRoute.params.subscribe(params => {
    let id= params['id']
    if(id){
      this.vehiculoService.getVehiculo(id).subscribe((vehiculo => this.vehiculo = vehiculo))
    }

  })
 }
 

  public create():void{
    this.vehiculoService.create(this.vehiculo)
    .subscribe({
      next: json=>{
          this.router.navigate(['/vehiculos']) //retorna al listado de clientes
          Swal.fire('Nuevo vehiculo', `${json.mensaje}: ${json.vehiculo.placa} `, 'success')
        },

      error: (err) =>{
        this.errores = err.error.errores as string[];
      }

    } );
  }

  update(): void{
    this.vehiculoService.update(this.vehiculo)
    .subscribe({
      next : vehiculo=>{
        this.router.navigate(['/vehiculos'])
        Swal.fire('Actualizar vehiculo', `Vehiculo ${vehiculo.placa} actualizado con exito!`, 'success')
      },
      error: (err) =>{
        this.errores = err.error.errores as string[];
      }

    })
  }


}
