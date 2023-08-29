import { Component , OnInit} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute} from '@angular/router';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {
  
  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"
  errores: string[];

  constructor(private clienteService: ClienteService, 
    private router:Router,
    private activateRoute: ActivatedRoute){}   //inyectamos la dependencia

  ngOnInit(): void {
    this.cargarCliente()

  }
 cargarCliente(): void{
   this.activateRoute.params.subscribe(params => {
      let id= params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente => this.cliente = cliente))
      }

   })
 }


/*
  public create():void{
     this.clienteService.create(this.cliente)
        .subscribe(json => {
              this.router.navigate(['/clientes'])
              Swal.fire('Nuevo cliente',`${json.mensaje}: ${json.cliente.nombre}`, 'success' )
        },
        err=> {
          this.errores= err.error.errors as string[];
        }
     
       );
  }*/

  public create():void{
    this.clienteService.create(this.cliente)
       .subscribe({
        next: json => {
             this.router.navigate(['/clientes'])
             Swal.fire('Nuevo cliente',`${json.mensaje}: ${json.cliente.nombre}`, 'success' )
       },
        error:(err) => {
          this.errores= err.error.errors as string[];
          console.error(' Código del error del backend: '+ err.status);
          console.error(err.error.errors);
        }
    
       });
 }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe({
          next: cliente => {
            this.router.navigate(['/clientes'])
            Swal.fire('Actualizar cliente',`Cliente ${cliente.nombre} actualizado con éxito!`, 'success' )
          },
          error: err => {
            this.errores= err.error.errors as string[];
           // console.error(' Código del error del backend en form component: '+ err.errors as string[]);
           console.error('Codigo del error desde el backend', err.status);
            console.error('en el form component si llego el error', this.errores);
          },
          complete: () => {
            console.log('Subscription completed');
          },
        })
  }
 /* 
  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(
        cliente => {
            this.router.navigate(['/clientes'])
            Swal.fire('Actualizar cliente',`Cliente ${cliente.nombre} actualizado con éxito!`, 'success' )
          },
          err => {
           //  this.errores= err.error.errors;
           // console.error(' Código del error del backend en form component: '+ err.errors as string[]);
            console.error('en el form component si llego el error',err.error as string);
          }
         
   )
  }*/
}




