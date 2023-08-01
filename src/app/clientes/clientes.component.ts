import { Component } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent {
  clientes: Cliente[] = [
    {id:1, nombre: 'Jhon', apellido: 'Ortiz', email: 'email@hotmail.com', createAt:'2023-08-01'},
    {id:2, nombre: 'Claudia', apellido: 'Gimenez', email: 'email@gmail.com', createAt:'2023-08-02'},
    {id:3, nombre: 'Roberto', apellido: 'Mendoza', email: 'email@yahoo.com', createAt:'2023-08-01'}

  ];

    constructor() {}
}
