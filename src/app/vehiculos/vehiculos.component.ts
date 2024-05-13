import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
  
})
export class VehiculosComponent implements OnInit {
   
   vehiculos: Vehiculo[];
   paginadorvehiculo: any;

    constructor(private vehiculoService: VehiculoService,
      private activatedRoute: ActivatedRoute,  public authService: AuthService){}
 
    /*  ngOnInit() {
       
      //  this.vehiculos= this.vehiculoService.getVehiculos();
        //this.vehiculos=VEHICULOS;
        this.vehiculoService.getVehiculos().subscribe(
          vehiculos => this.vehiculos=vehiculos //observador
        );
      }*/
      ngOnInit() {

       this.activatedRoute.paramMap.subscribe(params => {
        let page: number = +params.get('page');
        if(!page){
          page = 0;
        }
        this.vehiculoService.getVehiculos(page).pipe(
          tap(response => {
          //  console.log('clientes.component tap20');
  
            (response.content as Vehiculo[]).forEach(vehiculo => {
            //  console.log(vehiculo.placa);
            });
          })
  
        )
        
        .subscribe(
          response => {
            this.vehiculos= response.content as Vehiculo[];//observador
            this.paginadorvehiculo = response;
           // console.log("paginadorvehiculo.totalPages:", this.paginadorvehiculo.totalPages);
          }
          
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
