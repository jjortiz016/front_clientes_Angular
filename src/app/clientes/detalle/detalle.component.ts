import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  cliente: Cliente;
  titulo: string = "Detalle del cliente";


  constructor(private clienteService: ClienteService, private activatedRote: ActivatedRoute){}
  ngOnInit() {
    this.activatedRote.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente =>{
           this.cliente = cliente;
        })
      }
    })
  }
}
