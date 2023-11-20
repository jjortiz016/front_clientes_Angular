import { Component } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detallevehiculo',
  templateUrl: './detallevehiculo.component.html',
  styleUrls: ['./detallevehiculo.component.css']
})
export class DetallevehiculoComponent {
  vehiculo: Vehiculo;
  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute){}
  titulovehiculo: string="Detalle del vehiculo"
 
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id')
      if(id){
        this.vehiculoService.getVehiculo(id).subscribe(vehiculo=>{
          this.vehiculo = vehiculo;
        })
      }
    })
   
    
  }


}
