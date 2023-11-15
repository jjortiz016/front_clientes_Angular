import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';



@Component({
  selector: 'paginatorvehiculo-nav',
  templateUrl: './paginatorvehiculo.component.html'
 
  
})
export class PaginatorvehiculoComponent implements OnInit { //, OnChanges
  @Input() paginadorvehiculo: any;
  paginas: number[];

  constructor(){}
  ngOnInit(): void {
 //   console.log("paginadorvehiculo.totalPages en paginatorvehiculo:", this.paginadorvehiculo.totalPages);
      this.paginas = new Array(this.paginadorvehiculo.totalPages).fill(0).map((valor, indice)=> indice+1);      
  }
/*
  ngOnChanges(changes: SimpleChanges): void {
      
  }*/
}
