import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';



@Component({
  selector: 'paginatorvehiculo-nav',
  templateUrl: './paginatorvehiculo.component.html'
 
  
})
export class PaginatorvehiculoComponent implements OnInit, OnChanges { //, OnChanges
  @Input() paginadorvehiculo: any;
  paginas: number[];

  desde: number;
  hasta: number;


  constructor(){}
  
  ngOnInit(): void {
 
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.desde= Math.min(Math.max(1, this.paginadorvehiculo.number-4), this.paginadorvehiculo.totalPages-5);
    this.hasta= Math.max(Math.min(this.paginadorvehiculo.totalPages, this.paginadorvehiculo.number+4),6); 

    if(this.paginadorvehiculo.totalPages>5){
      this.paginas= new Array(this.hasta - this.desde+1).fill(0).map((_valor, indice)=> indice + this.desde);

    }else{
      this.paginas = new Array(this.paginadorvehiculo.totalPages).fill(0).map((valor, indice)=> indice+1);     
    }
    
    
     

  }
}
