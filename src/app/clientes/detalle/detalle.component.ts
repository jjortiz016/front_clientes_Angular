import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import  Swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  cliente: Cliente;
  titulo: string = "Detalle del cliente";
  public fotoSeleccionada: File;


  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute){}
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente =>{
           this.cliente = cliente;
        });
      }
    })
  }

  seleccionarFoto(event){
     this.fotoSeleccionada = event.target.files[0];
     console.log(this.fotoSeleccionada);

     if(this.fotoSeleccionada.type.indexOf('image')<0){
      //indexOf busca en la cadena si encuenta la palabra image, si no la encuentra retorna -1
      Swal.fire(
        'Error seleccionar imagen!',
        `El archivo debe ser de tipo imagen`,
        'error'
      );
      this.fotoSeleccionada=null; // se coloca en null para que la siguiente validación impida que se envie.

     }

  }
  subirFoto(){

    if(!this.fotoSeleccionada){
      Swal.fire(
        'Error upload!',
        `Debe seleccionar una foto,`,
        'error'
      )

    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente => {
          this.cliente = cliente;
          Swal.fire(
            'Guardada!',
            `La foto   ${cliente.foto} ha sido subidad correctamente.`,
            'success'
          )
      })
    }
  }
}
