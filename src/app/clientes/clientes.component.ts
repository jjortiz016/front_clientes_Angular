import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import  Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] ;
  paginador: any;
  clienteSeleccionado: Cliente;

    constructor(private clienteService: ClienteService,
       private activatedRoute: ActivatedRoute, private modalService: ModalService,
       private router:Router ) {}

    /*ngOnInit(){
    //  this.clientes= this.clienteService.getClientes();
      this.clienteService.getClientes().pipe(
        tap(clientes => {
          console.log('clientes.component tap3');
        
          clientes.forEach(cliente => {
            console.log(cliente.nombre);
          });
        })

        ).subscribe(
        clientes => this.clientes=clientes

      );

    }*/

  ngOnInit() {

    //  this.clientes= this.clienteService.getClientes();
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');  //el operador + convierte el parametro en un entero
      if (!page) { // por si no biene nada en el parametro se asignar la pagina 0
        page = 0;
      }

      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('clientes.component tap3');

          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })

      ).subscribe(
        response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });

    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    })
  }

    delete (cliente: Cliente): void {
      Swal.fire({
        title: 'Esta seguro?',
        text: `Seguro que desea elimina al cliente ${cliente.nombre} ${cliente.apellido}? `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!',
        cancelButtonText: 'No, cancelar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(cliente.id).subscribe(  
            response => {
             this.clientes= this.clientes.filter(cli => cli !==cliente) //para que filtre el cliente en la lista de la tabla.
             //this.router.navigate(['/clientes'])// se debe validar si la pagina donde elimino ya no existe para que no vuelva al inicio del listado sin necesidad
             Swal.fire(
                'Eliminado!',
                `El cliente ${cliente.nombre} ha sido eliminado.`,
                'success'
              )
            }
          )
        }
      })
    }

    abrirModalCliente(cliente: Cliente): void{
      this.clienteSeleccionado= cliente;
    }
}
