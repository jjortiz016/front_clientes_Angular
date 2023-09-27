import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
 
})
export class PaginatorComponent implements OnInit { // clase hija
 @Input() paginador: any; //con el decorador @Input() inyectar el paginador en la clase hija
 
 paginas: number[];

 constructor(){}

  ngOnInit(): void {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice+1);
  }

}
