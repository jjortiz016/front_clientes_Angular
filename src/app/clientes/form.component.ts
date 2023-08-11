import { Component , OnInit} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {
  
  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"

  constructor(private clienteService: ClienteService, private router:Router){}   //inyectamos la dependencia

  ngOnInit(): void {}

  public create():void{
     this.clienteService.create(this.cliente)
        .subscribe(cliente => {
              this.router.navigate(['/clientes'])
              Swal.fire('Nuevo cliente',`Cliente ${cliente.nombre} creadp con éxito!`, 'success' )
        }
       )
  }
}




