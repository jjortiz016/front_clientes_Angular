import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
  
})
export class VehiculosComponent implements OnInit {
 
   vehiculos: Vehiculo[];

    constructor(private vehiculoService: VehiculoService,
      private activatedRoute: ActivatedRoute){}
 
    /*  ngOnInit() {
       
      //  this.vehiculos= this.vehiculoService.getVehiculos();
        //this.vehiculos=VEHICULOS;
        this.vehiculoService.getVehiculos().subscribe(
          vehiculos => this.vehiculos=vehiculos //observador
        );
      }*/
      ngOnInit() {
       this.activatedRoute.paramMap.subscribe(paramas => {
        let page: number = +paramas.get('page');
        if(!page){
          page = 0;
        }
        this.vehiculoService.getVehiculos(page).pipe().subscribe(
          response=> this.vehiculos=response.content as Vehiculo[] //observador
        );
       })
      }

      delete (vehiculo: Vehiculo): void {
        Swal.fire({
          title: 'Esta seguro?',
          text: `Seguro que desea elimina al vehiculo ${vehiculo.placa} ${vehiculo.marca} ? `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminarlo!',
          cancelButtonText: 'No, cancelar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.vehiculoService.delete(vehiculo.id).subscribe(  
              response => {
               this.vehiculos= this.vehiculos.filter(cli => cli !==vehiculo) //para que filtre el cliente en la lista de la tabla.
                Swal.fire(
                  'Eliminado!',
                  `El cliente ${vehiculo.placa} ha sido eliminado.`,
                  'success'
                )
              }
            )
          }
        })
      }

}
